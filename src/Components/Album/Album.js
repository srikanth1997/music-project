import React, { Component } from "react";
import "./Album.css";
function Album({ album }) {

  return (
    <div className="album-div">
      <a className="anchor-class"
      href={album.collectionViewUrl}>
        <div className="image-container">
          <img
            className="img-responsive"
            src={album.artworkUrl100}
            alt={album.artistName}
          />
        </div>
        <div className="album-text">
          <h5 className="artist_name">{album.artistName}</h5>
          <p className="album_name">{album.trackName}</p>
          <p className="album_year"> {new Date(Date.parse(album.releaseDate)).getFullYear()}</p>
        </div>
        </a>
      
    </div>
  );
}

export default Album;
