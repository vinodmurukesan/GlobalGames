import { useState } from "react";
import FilterItem from "./filterItem";
import TransferIcon from "../assests/svg/transferIcon";
const BooleanFilter = ({ text = "filter", icon = <TransferIcon /> }) => {
  const [iseSelected, setIsSelected] = useState(false);
  const clickHandler = () => {
    setIsSelected(!iseSelected);
  };
  return (
    <FilterItem
      text={text}
      isSelected={iseSelected}
      icon={icon}
      clickHandler={clickHandler}
    />
  );
};
export default BooleanFilter;
