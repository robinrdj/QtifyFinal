import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Section from './components/Section/Section';
import Hero from './components/Hero/Hero';
function App() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://qtify-backend-labs.crio.do/albums/top"
        );
        setAlbums(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
    {/* <div className="App"> */}
    <Navbar searchData={[]}/>
    <Hero />
    {/* </div> */}
    <Section title="Top albums" apiEndpoint="https://qtify-backend-labs.crio.do/albums/top" isSong={false}/>  
    <Section title="New albums" apiEndpoint="https://qtify-backend-labs.crio.do/albums/new" isSong={false} />  
    <Section title="Songs" apiEndpoint="https://qtify-backend-labs.crio.do/songs" isSong={true} /> 
    </BrowserRouter>

  );
}

export default App;
