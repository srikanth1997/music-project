import React, { useEffect, useState } from "react";
import Album from "../Album/Album";
// import axios from '../axios';
import "./Albums.css";
import logo from '../../images/SharpSpring.png';
import avatar from '../../images/avatar.jpg';

function Albums({ title, fetchUrl }) {
  const [term, setTerm] = useState("taylor");
  const [albums, setAlbums] = useState([]);

  // fetchUrl = "";https://itunes.apple.com/search?term=taylor&media=music

  useEffect(() => {
    getData();
  }, [term]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const params = new URLSearchParams([['term', term], ['media', 'music']]);
  //     const request = await axios.get(fetchUrl, {params});
  //     setAlbums(request.data.results);
  //     // console.log(request.data.results);
  //     return request;
  //   }
  //   fetchData();
  // }, [term]);

  // useEffect(()=>{
  //   const MEDIA = "music";
  //   const api_url = `/search/?term=${term}&media=${MEDIA}`
  //   const response =  fetch(api_url);
  //   console.log(response);
  //   // const json =  response.json();
  //   // console.log(json);
  //   // setAlbums(jso);
  // }, [term]);

  const getData = async () => {
    const MEDIA = "music";
    const api_url = `/search/?term=${term}&media=${MEDIA}`;
    const response = await fetch(api_url);
    const json = await response.json();
    await setAlbums(json.results);
  };
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(event.target.value);
      setTerm(event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
    setTerm(event.target.value);
  }

  return (
    <div className="row">
      <form id="searchbox" className="search-container">
        <img className="company_logo" src={logo} />
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
        <img className="user_avatar" src={avatar} />

      </form>
      <div className="albums-container">
        {albums.map((album) => (
          <Album album={album} />
        ))}
      </div>
    </div>
  );
}

export default Albums;
