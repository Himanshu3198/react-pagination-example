import React, { useState, useEffect } from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import './style.css'
const renderData = (data) => {
    return (
        <ListGroup>

            {
                data.map((todo, index) => {
                    return <ListGroup.Item className="list-group text-left"  key={index}>{index+ 1}.  {todo.title}</ListGroup.Item>
                })
            }

        </ListGroup>
    )
}

function PaginationComponent() {
  const [data, setData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const [pageNumberLimit, setpageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

//   let pageIncrementBtn = null;
//   if (pages.length > maxPageNumberLimit) {
//     pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
//   }

//   let pageDecrementBtn = null;
//   if (minPageNumberLimit >= 1) {
//     pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
//   }

//   const handleLoadMore = () => {
//     setitemsPerPage(itemsPerPage + 5);
//   };

  return (
    <>
      <h1 className="bg-success ">React js Pagination</h1> <br />
      {renderData(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {/* {pageDecrementBtn} */}
        {renderPageNumbers}
        {/* {pageIncrementBtn} */}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      {/* <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button> */}
    </>
  );
}

export default PaginationComponent;
