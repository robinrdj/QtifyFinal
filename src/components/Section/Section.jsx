import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";


// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:



function Section({ title, apiEndpoint }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (error) {
    return <p>{error}</p>;
  }
  const swiper = new Swiper('.swiper', {
    // // configure Swiper to use modules
    // modules: [Navigation, Pagination],
    // ...
  });
  return (
    <div className={styles.section}>
      <div className={styles.heading}>
        <h3>{title}</h3>
      </div>
      { (
        <div className={styles.grid}>
          {data.map((item) => (
            <Card
              key={item.id}
              follows={item.follows}
              image={item.image}
              name={item.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;
