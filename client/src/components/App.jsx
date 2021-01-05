import React, { useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import axios from "axios";

const App = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [auth, setAuth] = useState(false);

  const onSearchSubmit = async (url) => {
    const { data } = await axios.post("/api/screenshots");
    setScreenshots(data);
  };

  return (
    <div>
      <Header auth={auth}></Header>
      <SearchBar auth={auth} onSubmit={onSearchSubmit}></SearchBar>
      <ImageList auth={auth} images={screenshots}></ImageList>
    </div>
  );
};

export default App;
