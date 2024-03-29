import { useState } from "react";
import PaginatedMovies from "./PaginatedMovies";
import { filter, filteredMovies } from "../states/features/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const Movies = () => {
  //
  const [startOffset, setStartOffset] = useState(0);

  const movies = useSelector(filteredMovies);

  const totalMovies = movies.length; // 20

  const moviesPerPage = 8;

  const totalPages = Math.ceil(totalMovies / moviesPerPage); // 3

  const endOffset = startOffset + moviesPerPage;

  const paginatedMovies = movies.slice(startOffset, endOffset);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * moviesPerPage) % totalMovies;
    setStartOffset(newOffset);
  };

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center">
      <PaginatedMovies movies={paginatedMovies} />

      {paginatedMovies.length ? (
        <ReactPaginate
          className="flex flex-row gap-4 mt-5 mb-10"
          breakLabel={<span className="mx-2">...</span>}
          nextLabel={
            <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          }
          previousLabel={
            <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={moviesPerPage}
          pageCount={totalPages}
          //
          containerClassName="flex items-center justify-center my-4"
          pageClassName="block border- border-solid border-lightGray hover:bg-black hover:text-white w-8 h-8 flex items-center justify-center rounded-md"
          activeClassName="bg-black text-white"
        />
      ) : (
        <div className="flex flex-col justify-center align-middle gap-5">
          <p className="text-2xl">There is no movie for this interest</p>
          <button
            onClick={() => dispatch(filter(0))}
            className=" px-3 py-2 mx-auto text-sm w-6/12 text-white rounded-md bg-gray-800 border border-solid shadow-sm transition-all duration-300
        hover:cursor-pointer hover:text-black hover:border-black hover:outline-gray-800 hover:bg-white hover:outline-8"
          >
            Back to all categories
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
