import { useContext, useEffect } from "react";
import reactTableContext from "../../stores/react-table-context";
import {
  FastForwardLeftArrowCircleDisabled,
  FastForwardLeftArrowCircle,
  LeftDisabledArrowCircle,
  LeftArrowCircle,
  RightArrowCircleDisabled,
  RightArrowCircle,
  FastForwardRightArrowCircleDisabled,
  FastForwardRightArrowCircle
} from "../Icons/Arrows";

const PaginationButtons = ({
  pageIndex,
  pageCount,
  nextPage,
  canNextPage,
  pageOptions,
  previousPage,
  canPreviousPage,
  gotoPage
}) => {
  const reactTableCtx = useContext(reactTableContext);

  useEffect(() => {
    reactTableCtx.setPaginationIndex({ pageIndexValue: pageIndex });
  }, [pageIndex]);

  return (
    <>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {!canPreviousPage ? (
          <FastForwardLeftArrowCircleDisabled />
        ) : (
          <FastForwardLeftArrowCircle />
        )}
      </button>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {!canPreviousPage ? <LeftDisabledArrowCircle /> : <LeftArrowCircle />}
      </button>
      <strong>
        {pageIndex} of {pageOptions.length}
      </strong>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {!canNextPage ? <RightArrowCircleDisabled /> : <RightArrowCircle />}
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {!canNextPage ? (
          <FastForwardRightArrowCircleDisabled />
        ) : (
          <FastForwardRightArrowCircle />
        )}
      </button>
    </>
  );
};

export default PaginationButtons;
