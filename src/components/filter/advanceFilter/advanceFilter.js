import { useRef, useState } from "react";
import FilterItem from "../filterItem/filterItem";
import MultipleIcon from "../../assests/svg/multipleIcon";
import styles from "./advanceFilter.module.css";
import FormInput from "../../ui/input/input";
import { useDebounce } from "../../utility/useDebounce";
import { useDetectClickOutsideComponent } from "../../utility/useDetectClickOutSideComponent";

const OptionalFilter = ({
  multiOption,
  text,
  icon,
  options,
  searchable = false,
  selectedItems,
  setSelectedItems,
}) => {
  const [optionList, setOptionList] = useState(options);
  const [showOptionList, setShowOptionList] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const wrapperRef = useRef(null);
  useDetectClickOutsideComponent(wrapperRef, () => {
    setShowOptionList(false);
  });
  const selectOptionHandle = (selectedItem) => {
    const filterList = optionList.filter((item) => item !== selectedItem);
    if (multiOption) {
      setSelectedItems([...selectedItems, selectedItem]);
      setOptionList(filterList);
    } else {
      setSelectedItems([selectedItem]);
      setOptionList([...filterList, ...selectedItems]);
    }
  };
  const toggleShowOption = () => {
    setShowOptionList(!showOptionList);
  };
  const deleteFromSelectedHandler = (selectedItem) => {
    const filterList = selectedItems.filter((item) => item !== selectedItem);
    setOptionList([...optionList, selectedItem]);
    setSelectedItems(filterList);
    if (searchable) {
      filterSearch(searchValue, filterList);
    }
  };
  const filterSearch = (value, selectedList = selectedItems) => {
    const filterByValue = options.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    const filterBySelected = filterByValue.filter(
      (item) => !selectedList.includes(item)
    );
    setOptionList(filterBySelected);
  };
  const debouncedFilterSearch = useDebounce(filterSearch, 500);
  const searchHandle = (e) => {
    setSearchValue(e.target.value);
    debouncedFilterSearch(e.target.value);
  };

  return (
    <div className={styles.optionWrapper} ref={wrapperRef}>
      <FilterItem
        text={text}
        isSelected={selectedItems.length ? true : false}
        icon={icon}
        clickHandler={toggleShowOption}
      />
      {selectedItems.map((item, index) => {
        return (
          <FilterItem
            key={index}
            text={item}
            isSelected={true}
            icon={<MultipleIcon />}
            clickHandler={() => deleteFromSelectedHandler(item)}
          />
        );
      })}
      {showOptionList ? (
        <div className={styles.optionPart}>
          {searchable ? (
            <FormInput
              name="search"
              placeholder="Search"
              onChange={searchHandle}
              value={searchValue}
            />
          ) : null}

          <ul>
            {optionList.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    selectOptionHandle(item);
                  }}
                >
                  <a href="javascript:void(0)">{item}</a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
export default OptionalFilter;
