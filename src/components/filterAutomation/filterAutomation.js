import { useCallback, useEffect, useState, useRef } from "react";
import ToggleFilter from "../filter/toggleFilter/toggleFilter";
import AdvanceFilter from "../filter/advanceFilter/advanceFilter";
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
    // Extract unique category titles from all items in 'data'
    const categoryFilter = data.flatMap((item) =>
      item.categories.map((category) => category.title),
    );

    // Extract unique site titles from all items in 'data'
    const siteFilter = data.flatMap((item) =>
      item.sites.map((site) => site.title),
    );

    // Update state variables with unique category and site titles
    setCategoryOptions(Array.from(new Set(categoryFilter)));
    setSiteOptions(Array.from(new Set(siteFilter)));
  }, [data]);

  const handleSiteChange = (dataList) => {
    if (siteSelectedItems.length) {
      // Filter dataList to include only items that have sites matching the selected site titles
      return dataList.filter((item) =>
        item.sites.some((siteItem) =>
          siteSelectedItems.includes(siteItem.title),
        ),
      );
    }
    // If no site is selected, return the original dataList
    return dataList;
  };

  const handleCategoryChange = (dataList) => {
    if (categorySelectedItems.length) {
      return dataList.filter((item) =>
        item.categories.some(
          (catItem) => catItem.title === categorySelectedItems[0],
        ),
      );
    }
    return dataList;
  };

  const filterChangeHandler = () => {
    const filteredData = handleCategoryChange(handleSiteChange(data));
    handleFilterData(filteredData);
  };

  const showArrowHandle = () => {
    const { scrollWidth, clientWidth } = wrapperRef.current;
    setShowArrow(scrollWidth > clientWidth || clientWidth < 600);
  };

  const handleScroll = (value) => {
    const { current } = wrapperRef;
    const newScrollLeft = current.scrollLeft + value;

    current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    const isEndScrollDisabled =
      newScrollLeft + 50 > current.scrollWidth - current.clientWidth;
    const isStartScrollDisabled = newScrollLeft < 50;

    setDisableEndScroll(isEndScrollDisabled);
    setDisableStartScroll(isStartScrollDisabled);
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
    <nav
      className={`${
        showArrow ? styles.outerBox + " activePadding" : styles.outerBox
      }`}
      aria-label="Filter Navigation"
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

      <div className={styles.filterWrapper} ref={wrapperRef} role="list">
        <ToggleFilter text="Extract Data" icon={<TransferIcon />} />
        <ToggleFilter text="Monitoring" icon={<MonitorIcon />} />
        {siteOptions ? (
          <AdvanceFilter
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
          <AdvanceFilter
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
    </nav>
  );
};
export default FilterAutomation;
