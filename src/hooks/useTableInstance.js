import {
  useTable,
  useSortBy,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  usePagination
} from "react-table";

const useTableInstance = (
  columns,
  data,
  defaultColumn,
  currentPageIndex = 1,
  currentRowPerPage = 10,
  maxTotalCountPage = 1
) => {
  // These are functions and arrays from the hook that comes from the useHook package given to us to enable easy table creation
  const tableInstance = useTable(
    {
      // This hook takes two properties, columns and data to render the UI.
      columns: columns,
      data: data,
      defaultColumn: defaultColumn, // pParticularly useful for adding global column properties. For instance, when using the useFilters plugin hook
      initialState: {
        pageIndex: currentPageIndex, // This is the current pageIndex value
        pageSize: currentRowPerPage // Change the value if you wish to increase/decrease to display Row per page on the site
      },
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: Math.ceil(maxTotalCountPage / currentRowPerPage) // Counting how many page(s) there is for the total pagination
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  // These are functions and arrays from the hook that comes from the useHook package given to us to enable easy table creation
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, //This will give us access our grouped of header such as first name, last name, id etc.
    rows, // Used for displaying counted rows
    page: paginationPageRows, // Used for pagination
    prepareRow,
    selectedFlatRows, // Give us a copy that helps keep track of the selected rows the checkbox. This will give us a flat array in return of currently selected checkbox
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
    gotoPage, // Used to indicate which page number we want specific to go at
    pageCount // used for counting how many page left
  } = tableInstance;

  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    paginationPageRows,
    prepareRow,
    selectedFlatRows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    state: {
      globalFilter,
      pageIndex,
      pageSize
    },
    setGlobalFilter,
    gotoPage,
    pageCount
  };
};

export default useTableInstance;
