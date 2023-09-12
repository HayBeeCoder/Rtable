import { useContext, Fragment } from "react";
import reactTableContext from "../../stores/react-table-context";
import styles from "./RangePerPageRow.module.scss";

const RangePerPageRow = ({ pageSize, setPageSize, className }) => {
  const reactTableCtx = useContext(reactTableContext);

  const setPageSizeHandler = (e) => {
    const currentPageSize = Number(e.target.value);

    reactTableCtx.setRangePageSize({ rangePerSizeValue: currentPageSize });
    setPageSize(currentPageSize);
  };

  return (
    <div className={className}>
      <p className={styles["label-text"]}>Row Per Page</p>
      <select
        value={pageSize}
        onChange={setPageSizeHandler}
        className={styles["dropdown"]}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => {
          return (
            <Fragment key={pageSize}>
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            </Fragment>
          );
        })}
      </select>
    </div>
  );
};

export default RangePerPageRow;
