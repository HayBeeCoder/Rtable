import React from "react";

const reactTableContext = React.createContext({
  tableState: {},
  setRangePageSize: (rangePerSizeValue) => {},
  setGoToPage: (goToPageValue) => {},
  setGlobalFilterSearch: (globalFilterSearchValue) => {},
  setPageIndex: (pageIndexValue) => {},
  setMaxTotalPage: (maxTotalPageValue) => {}
});

export default reactTableContext;
