import { useCallback, useEffect, useState, useRef } from "react";
import BooleanFilter from "../filter/booleanFilter";
import OptionalFilter from "../filter/optionalFilter";
import TransferIcon from "../assests/svg/transferIcon";
import MonitorIcon from "../assests/svg/monitorIcon";
import PlusIcon from "../assests/svg/plusIcon";
import ArrowIcon from "../assests/svg/arrowIcon";
import styles from "./filterAutomation.module.css";

const FilterAutomation = ({ data, handleFilterData }) => {
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [siteOptions, setSiteOptions] = useState(null);
  const [categorySelectedItems, setCategorySelectedItems] = useState([]);
  const [siteSelectedItems, setSiteSelectedItems] = useState([]);
  const [showArrow, setShowArrow] = useState(false);
  const [disableStartScroll, setDisableStartScroll] = useState(true);
  const [disableEndScroll, setDisableEndScroll] = useState(false);
  const wrapperRef = useRef(null);

  const getFilterOptions = useCallback(() => {
    const categoryFilter = [];
    const siteFilter = [];
    data.forEach((item) => {
      const categoryItem = item.categories.map((category) => {
        return category.title;
      });
      categoryFilter.push(...categoryItem);
      const siteItem = item.sites.map((site) => {
        return site.title;
      });
      siteFilter.push(...siteItem);
    });
    setCategoryOptions([...new Set(categoryFilter)]);
    setSiteOptions([...new Set(siteFilter)]);
  }, [data]);

  const handleSiteChange = (dataList) => {
    if (siteSelectedItems.length) {
      const filteredItem = dataList.filter((item) => {
        return item.sites.find((siteItem) =>
          siteSelectedItems.includes(siteItem.title)
        );
      });
      return filteredItem;
    }
    return dataList;
  };

  const handleCategoryChange = (dataList) => {
    if (categorySelectedItems.length) {
      const filteredItem = dataList.filter((item) => {
        return item.categories.find(
          (catItem) => catItem.title === categorySelectedItems[0]
        );
      });
      return filteredItem;
    }
    return dataList;
  };

  const filterChangeHandler = () => {
    const result = handleSiteChange(data);
    const catResult = handleCategoryChange(result);
    handleFilterData(catResult);
  };

  const showArrowHandle = () => {
    setShowArrow(
      wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth ||
        wrapperRef.current.clientWidth < 600
    );
  };

  const handleScroll = (value) => {
    wrapperRef.current.scrollTo({
      left: (wrapperRef.current.scrollLeft += value),
      behavior: "smooth",
    });
    setDisableEndScroll(
      wrapperRef.current.scrollLeft + 50 >
        wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth
    );
    setDisableStartScroll(wrapperRef.current.scrollLeft < 50);
  };

  useEffect(() => {
    getFilterOptions();
  }, [data, getFilterOptions]);

  useEffect(() => {
    filterChangeHandler();
    showArrowHandle();
     // eslint-disable-next-line
  }, [siteSelectedItems, categorySelectedItems]);
  
  return (
    <div
      className={`${
        showArrow ? styles.outerBox + " activePadding" : styles.outerBox
      }`}
    >
      {showArrow ? (
        <>
          <span className={disableEndScroll ? "disabled" : null}>
            <span
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => {
                if (!disableEndScroll) handleScroll(50);
              }}
            >
              <ArrowIcon />
            </span>
          </span>
          <span className={disableStartScroll ? "disabled" : null}>
            <span
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => {
                if (!disableStartScroll) handleScroll(-50);
              }}
            >
              <ArrowIcon />
            </span>
          </span>
        </>
      ) : null}

      <div className={styles.filterWrapper} ref={wrapperRef}>
        <BooleanFilter text="Extract Data" icon={<TransferIcon />} />
        <BooleanFilter text="Monitoring" icon={<MonitorIcon />} />
        {siteOptions ? (
          <OptionalFilter
            multiOption={true}
            text="Filter by Site"
            icon={<PlusIcon />}
            options={siteOptions}
            searchable={true}
            selectedItems={siteSelectedItems}
            setSelectedItems={setSiteSelectedItems}
          />
        ) : null}

        {categoryOptions ? (
          <OptionalFilter
            multiOption={false}
            text="Filter by Category"
            icon={<PlusIcon />}
            options={categoryOptions}
            searchable={false}
            selectedItems={categorySelectedItems}
            setSelectedItems={setCategorySelectedItems}
          />
        ) : null}
      </div>
    </div>
  );
};
export default FilterAutomation;
