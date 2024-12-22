import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

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
