import styles from "./filter.module.css";
const FilterItem = ({ isSelected = false, text, icon, clickHandler }) => {
  return (
    <span
      onClick={clickHandler}
      className={`${
        isSelected ? styles.filterItem + " active" : styles.filterItem
      } `}
    >
      {icon}
      {text}
    </span>
  );
};
export default FilterItem;
