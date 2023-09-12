import { useMemo, useContext } from "react";
import { usePostsList } from "./hooks/usePosts";
import reactTableContext from "./stores/react-table-context";
import POSTS_COLUMNS_DATA from "./react-table-data/react-table-posts";
import useTableInstance from "./hooks/useTableInstance";
import TableColumnFilter from "./components/Parts/TableColumnFilter";
import TableGlobalFilterSearch from "./components/Parts/TableGlobalFilterSearch";
import GoToPage from "./components/Parts/GoToPage";
import RangePerPageRow from "./components/Parts/RangePerPageRow";
import PaginationButtons from "./components/Parts/PaginationButtons";
import ReactTable from "./components/Parts/ReactTable";
import styles from "./App.module.scss";

const MembershipListPage = () => {
  const reactTableCtx = useContext(reactTableContext);

  const { data: POST_DATA, isLoading } = usePostsList();

  const tableColumns = useMemo(() => POSTS_COLUMNS_DATA, []);
  const tableData = useMemo(() => POST_DATA, [POST_DATA]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: TableColumnFilter
    };
  }, []);

  // We want to use this variables to initiate our paginations values
  const maxTotalCountPage = reactTableCtx.tableState.totalPageCount;
  const currentPageIndex = reactTableCtx.tableState.pageIndex;
  const currentRowPerPage = reactTableCtx.tableState.rangePerPageSize;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, //This will give us access our grouped of header such as first name, last name, id etc.
    paginationPageRows,
    nextPage, // React tables gives us this function so we can navigate as "next page"
    previousPage, // Same, but only "previous page"
    canNextPage, // this is to use for disabling the button click to go next page if there are no more page that exist
    canPreviousPage, // same thing with this, but only for the previous button instead
    pageOptions, // get the length of the object that exist total on the page
    setPageSize, // Configuring to display page size number. Default comes with 10 from react table. We can fix it to display 50 for example
    state: {
      globalFilter, // Initialize state of the current typed value of the settings
      pageIndex, // Displaying page index for incrementing by 1. It will observe where you are at in current pagination number
      pageSize // “pageSize” of the initial state.
    },
    setGlobalFilter, //Updateing the state of the typed value from the input field
    prepareRow,
    gotoPage, // Used to indicate which page number we want specific to go at
    pageCount // used for counting how many page left
  } = useTableInstance(
    tableColumns,
    tableData,
    defaultColumn,
    currentPageIndex,
    currentRowPerPage,
    maxTotalCountPage
  );

  const countPosts = POST_DATA?.length ?? "";

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className={styles["header-title"]}>Total Posts {countPosts}</h1>
          <h2>Object of the pagination:</h2>
          {JSON.stringify(reactTableCtx.tableState)}

          <div className={styles["grid-container__table-section"]}>
            <div className={styles["table-search"]}>
              <TableGlobalFilterSearch
                filter={globalFilter}
                setFilter={setGlobalFilter}
              />
              <GoToPage
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                className={styles["input-go-to-page"]}
              />
              <RangePerPageRow
                pageSize={pageSize}
                setPageSize={setPageSize}
                className={styles["select-go-to-page"]}
              />
              <PaginationButtons
                pageIndex={pageIndex}
                pageCount={pageCount}
                nextPage={nextPage}
                canNextPage={canNextPage}
                pageOptions={pageOptions}
                previousPage={previousPage}
                canPreviousPage={canPreviousPage}
                gotoPage={gotoPage}
              />
            </div>

            <ReactTable
              headerGroups={headerGroups}
              getTableBodyProps={getTableBodyProps}
              rows={paginationPageRows}
              getTableProps={getTableProps}
              prepareRow={prepareRow}
            />
          </div>
        </>
      )}
    </>
  );
};

export default MembershipListPage;
