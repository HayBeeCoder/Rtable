import { useContext } from "react";
import reactTableContext from "../../stores/react-table-context";
import styles from "./GoToPage.module.scss";

const GoToPage = ({ pageIndex, gotoPage, className }) => {
  const reactTableCtx = useContext(reactTableContext);

  const goToPageHandler = (e) => {
    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
    reactTableCtx.setGoToPage({ goToPageValue: pageNumber + 1 });
    gotoPage(pageNumber);
  };

  return (
    <div className={styles["go-to-page-section"]}>
      <p>Go To Page: &nbsp;</p>
      <input
        type="number"
        defaultValue={pageIndex}
        onChange={goToPageHandler}
        className={className}
      />
    </div>
  );
};

export default GoToPage;
