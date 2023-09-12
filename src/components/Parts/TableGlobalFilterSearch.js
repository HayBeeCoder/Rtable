import { useState, useContext } from "react";
import { useAsyncDebounce } from "react-table";
import reactTableContext from "../../stores/react-table-context";
import styles from "./TableGlobalFilterSearch.module.scss";

const TableGlobalFilterSearch = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const reactTableCtx = useContext(reactTableContext);

  const debounceHandler = useAsyncDebounce((value) => {
    setFilter(value || "");
  }, 0);

  const onChangeHandler = (event) => {
    const enteredInputField = event.target.value;
    reactTableCtx.setGlobalFilterSearch({
      globalFilterSearchValue: enteredInputField
    });
    setValue(enteredInputField);
    debounceHandler(enteredInputField);
  };

  return (
    <div
      className={styles["global-input-section"]}
      style={{ marginRight: "auto" }}
    >
      <input
        type="text"
        placeholder="search..."
        value={`${value}` || ""}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default TableGlobalFilterSearch;
