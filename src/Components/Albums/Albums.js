import React, { useCallback, useEffect, useState } from "react";
import Album from "../Album/Album";
import "./Albums.css";
import logo from "../../images/SharpSpring.png";
import avatar from "../../images/avatar.jpg";
import TablePagination from "@material-ui/core/TablePagination";
import useDebounce from "../../Hooks/useDebounse";

function Albums({ title, fetchUrl }) {
  const [term, setTerm] = useState("taylor");
  const [albums, setAlbums] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [albumsPerPage, setAlbumsPerPage] = useState(10);
  const [lastIndex, setLastIndex] = useState(0);
  const [firstIndex, setFirstIndex] = useState(10);
  const debouncedTerm = useDebounce(term, 400);

  const getData = useCallback(async () => {
    const MEDIA = "music";
    const api_url = `/search/?term=${debouncedTerm}&media=${MEDIA}`;
    // const api_url = `/search/?term=${term}&media=${MEDIA}`;
    const response = await fetch(api_url);
    const json = await response.json();
    await setAlbums(json.results);
  }, [debouncedTerm]);

  useEffect(() => {
    getData();
  }, [debouncedTerm, getData]);

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


  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      setTerm(event.target.value);
    }
  }

  return (
    <div className="row">
      <form id="searchbox" className="search-container">
        <a href="https://sharpspring.com/" target="_blank" rel="noreferrer">
          <img
            className="company_logo"
            src={logo}
            href="https://sharpspring.com/"
            target="_blank"
            rel="noreferrer"
            alt="company_logo"
          />
        </a>
        <label className="search-label">
          <span className="Nav-label">Search your favorite artist</span>

          <input
            className="search-bar"
            type="text"
            search="search"
            onKeyPress={handleKeyPress}
            onChange={(e) => setTerm(e.target.value)}
          />
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
