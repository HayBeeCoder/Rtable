import React from "react";
import styles from "./ReactTable.module.scss";

const ReactTable = ({
  headerGroups,
  getTableBodyProps,
  rows,
  getTableProps,
  prepareRow,
  visibleCaratIcons = true,
  getRowProps = () => ({})
}) => {
  return (
    <div className={styles["react-table"]}>
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  // The 'Header' property is located on the columns.js file, so basically, id, first_name, last_name etc.
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // getRowProps is a callback function
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((rowCell) => {
                  return (
                    <td {...rowCell.getCellProps()}>
                      {rowCell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;
