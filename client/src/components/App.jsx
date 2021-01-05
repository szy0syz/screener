import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import axios from 'axios';

const App = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    fetchScreenshots();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data } = await axios.get(`/api/me`);
    setAuth(data);
  };

  const fetchScreenshots = async () => {
    const { data } = await axios.get(`/api/screenshots`);
    setScreenshots(data);
  };

  const onSearchSubmit = async (url) => {
    const { data } = await axios.post('/api/screenshots', { url });
    setScreenshots([...screenshots, data]);
  };

  const deleteScreentshot = async (id) => {
    const { data } = await axios.delete(`/api/screenshots/${id}`);
    const newScreenshots = screenshots.filter((screenshot) => {
      return screenshot.id !== data.id;
    });
    setScreenshots(newScreenshots);
  };

  return (
    <div className="ui container" style={{marginTop: '10px'}}>
      <Header auth={auth} />
      <SearchBar auth={auth} onSubmit={onSearchSubmit} />
      <ImageList
        auth={auth}
        images={screenshots}
        deleteScreentshot={deleteScreentshot}
      />
    </div>
  );
};

export default App;
