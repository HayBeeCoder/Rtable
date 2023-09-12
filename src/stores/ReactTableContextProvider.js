import { useReducer } from "react";
import RangePerPageRow from "../components/Parts/RangePerPageRow";
import ReactTableContext from "./react-table-context";

const ACTION = {
  ENTERED_RANGE_PER_SIZE: "entered-range-per-size",
  ENTERED_GLOBAL_SEARCH_VALUE: "entered-global-search-value",
  GO_TO_PAGE: "go-to-page",
  PAGINATION_INDEX: "page-index",
  MAX_TOTAL_PAGE: "max-total-page"
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ENTERED_RANGE_PER_SIZE:
      return { ...state, rangePerPageSize: action.rangePerSizeValue };
    case ACTION.ENTERED_GLOBAL_SEARCH_VALUE:
      return { ...state, globalFilterSearch: action.globalFilterSearchValue };
    case ACTION.GO_TO_PAGE:
      return { ...state, goToPage: action.goToPageValue };
    case ACTION.PAGINATION_INDEX:
      return { ...state, pageIndex: action.pageIndexValue };
    case ACTION.MAX_TOTAL_PAGE:
      return { ...state, totalPageCount: action.totalPageValue };
    default:
      return state;
  }
};

const defaultTableState = {
  rangePerPageSize: 10,
  goToPage: 1,
  globalFilterSearch: "",
  pageIndex: 1,
  totalPageCount: 1,
  pageComputedAvailable: 0
};

const ReactTableContextProvider = ({ children }) => {
  const [tableState, dispatchTableAction] = useReducer(
    tableReducer,
    defaultTableState
  );

  const setRangePageSizeHandler = ({ rangePerSizeValue }) => {
    dispatchTableAction({
      type: ACTION.ENTERED_RANGE_PER_SIZE,
      rangePerSizeValue
    });
  };

  const setGoToPageHandler = ({ goToPageValue }) => {
    dispatchTableAction({
      type: ACTION.GO_TO_PAGE,
      goToPageValue
    });
  };

  const setGlobalFilterSearchHandler = ({ globalFilterSearchValue }) => {
    dispatchTableAction({
      type: ACTION.ENTERED_GLOBAL_SEARCH_VALUE,
      globalFilterSearchValue
    });
  };

  const setPaginationIndexHandler = ({ pageIndexValue }) => {
    dispatchTableAction({
      type: ACTION.PAGINATION_INDEX,
      pageIndexValue
    });
  };

  const setMaxTotalPageHandler = ({ totalPageValue }) => {
    dispatchTableAction({
      type: ACTION.MAX_TOTAL_PAGE,
      totalPageValue
    });
  };

  const tableContext = {
    tableState: tableState,
    setRangePageSize: setRangePageSizeHandler,
    setGoToPage: setGoToPageHandler,
    setGlobalFilterSearch: setGlobalFilterSearchHandler,
    setPaginationIndex: setPaginationIndexHandler,
    setMaxTotalPage: setMaxTotalPageHandler
  };

  return (
    <ReactTableContext.Provider value={tableContext}>
      {children}
    </ReactTableContext.Provider>
  );
};

export default ReactTableContextProvider;
