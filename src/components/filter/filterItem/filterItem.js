import styles from "./filterItem.module.css";
const FilterItem = ({ isSelected = false, text, icon, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className={`${
        isSelected ? styles.filterItem + " active" : styles.filterItem
      } `}
      aria-label={text}
    >
      {icon}
      {text}
    </button>
  );
};
export default FilterItem;
