import randomNumber from "../../helpers/genRandomNumber";
import { DOTS, usePagination } from "../../hooks/usePagination";
import styles from "./pagination.module.scss";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${styles.pagination_container} ${className && className}`}>
      {/* Left navigation arrow */}
      <li
        className={`${styles.pagination_item} ${
          currentPage === 1 ? `${styles.disabled}` : ""
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              className={`${styles.pagination_item} ${styles.dots}`}
              key={randomNumber(Date.now())}
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={`${styles.pagination_item} ${
              pageNumber === currentPage ? `${styles.selected}` : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={randomNumber(Date.now())}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`${styles.pagination_item} ${
          currentPage === lastPage ? `${styles.disabled}` : ""
        }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
