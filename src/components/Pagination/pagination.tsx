import React, { useEffect, useState, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";

interface Props {
  currentPage: number;
  total: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Something = ({
  total = 0,
  itemsPerPage = 4,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

//   if (totalPages === 0) return null;

  return (
    <div>
      <Pagination>
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default Something;
// import React, { useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
// import Pagination from "react-bootstrap/Pagination";

//  interface Props {
//     currentPage: number;
//     total: number;
//     itemsPerPage: number;
//     onPageChange: (page: number) => void;

//   }
// const Pagination= ({
//   currentPage,
//   total,
//   itemsPerPage,
//   onPageChange
// }:Props) => {
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         if (total > 0 && itemsPerPage > 0)
//             setTotalPages(Math.ceil(total / itemsPerPage));
//     }, [total, itemsPerPage]);

//     const paginationItems = useMemo(() => {
//         const pages = [];

//         for (let i = 1; i <= totalPages; i++) {
//             pages.push(
//                 <Pagination.Item
//                     key={i}
//                     active={i === currentPage}
//                     onClick={() => onPageChange(i)}
//                 >
//                     {i}
//                 </Pagination.Item>
//             );
//         }

//         return pages;
//     }, [totalPages, currentPage]);

//     if (totalPages === 0) return null;

//     return (
//         <Pagination >
//             <Pagination.Prev
//                 onClick={() => onPageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//             />
//             {paginationItems}
//             <Pagination.Next
//                 onClick={() => onPageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//             />
//         </Pagination>
//     );
// };

// export default PaginationComponent;
