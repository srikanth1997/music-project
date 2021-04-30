import React, { useCallback, useEffect, useState } from "react";
import Album from "../Album/Album";
import "./Albums.css";
import logo from "../../images/SharpSpring.png";
import avatar from "../../images/avatar.jpg";
import TablePagination from "@material-ui/core/TablePagination";

function Albums({ title, fetchUrl }) {
  const [term, setTerm] = useState("taylor");
  const [albums, setAlbums] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [albumsPerPage, setAlbumsPerPage] = useState(10);
  const [lastIndex, setLastIndex] = useState(0);
  const [firstIndex, setFirstIndex] = useState(10);

  const getData = useCallback(async () => {
    const MEDIA = "music";
    const api_url = `/search/?term=${term}&media=${MEDIA}`;
    const response = await fetch(api_url);
    const json = await response.json();
    await setAlbums(json.results);
  }, [term]);

  useEffect(() => {
    getData();
  }, [term, getData]);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(event.target.value);
      setTerm(event.target.value);
    }
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log(event.target.value);
  //   setTerm(event.target.value);
  // }

  const handleChangePage = (event, newPageNum) => {
    setPageNumber(newPageNum);
    setLastIndex(newPageNum * albumsPerPage);
    setFirstIndex(newPageNum * albumsPerPage + albumsPerPage);
  };

  function handleChangeRowsPerPage(event) {
    setAlbumsPerPage(event.target.value);
    setPageNumber(0);
    setLastIndex(0);
    setFirstIndex(event.target.value);
  }

  return (
    <div className="row">
      <form id="searchbox" className="search-container">
      <a href = "https://sharpspring.com/" target = "_blank"> 
      <img className="company_logo" src={logo} href="https://sharpspring.com/" target="_blank" alt="company_logo" />

      </a>
        <label className="search-label">
          <span className="Nav-label">Search your favorite artist</span>

          <input
            className="search-bar"
            type="text"
            search="search"
            onKeyPress={handleKeyPress}
          />
          {/* <i
            className="fa fa-search fa-3"
            aria-hidden="true"
            onClick={handleClick}
          ></i> */}
        </label>
        <img className="user_avatar" src={avatar} alt="user_avatar" />
      </form>
      <div className="albums-container">
        {albums.slice(lastIndex, firstIndex).map((album, i) => (
          <Album key={i} album={album} />
        ))}
      </div>
      <TablePagination
        className="pagination"
        component="div"
        count={albums.length}
        page={pageNumber}
        onChangePage={handleChangePage}
        rowsPerPage={albumsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Albums;
