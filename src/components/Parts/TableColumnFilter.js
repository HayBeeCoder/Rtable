// This Component is used in context with the TableGlobalFilterSearch. This will "connect" the user entering input search
// for filtering the search of the column on the site
const TableColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const onChangeColumnFilterHandler = (event) => {
    const enteredFiltered = event.target.value;
    setFilter((prevEnteredFilter) => {
      return {
        ...prevEnteredFilter,
        enteredFiltered
      };
    });
  };

  return (
    <span>
      Search:{" "}
      <input
        type="text"
        value={filterValue || ""}
        placeholder="search"
        onChange={onChangeColumnFilterHandler}
      />
    </span>
  );
};

export default TableColumnFilter;
