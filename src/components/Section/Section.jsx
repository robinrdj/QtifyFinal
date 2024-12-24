import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

//for swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

// for tabs
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Button from "../Button/Button";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Section({ title, apiEndpoint, isSong }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [expand, setExpand] = useState(false);
  const [genres, setGenres] = useState([]);

  const [value, setValue] = React.useState(0);
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
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://qtify-backend-labs.crio.do/genres"
        );
        setGenres(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchGenres();
  }, [apiEndpoint]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data.length) {
    return <p>Loading...</p>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={styles.section}>
      {!isSong ? (
        <div>
          <div className={styles.heading}>
            <h3>{title}</h3>
            <Button
              content={"Show All"}
              onClick={() => {
                setExpand(!expand);
              }}
            />
          </div>
          {!expand ? (
            <Swiper
              slidesPerView={7}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card
                    follows={item.follows}
                    image={item.image}
                    name={item.title}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            ""
          )}

          {expand ? (
            <div className={styles.grid}>
              {data.map((item) => (
                <Card
                  key={item.id}
                  follows={item.follows}
                  image={item.image}
                  name={item.title}
                  isSong={false}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          <h3>{title}</h3>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {genres.map((item, ind) => {
                return <Tab label={item.label} {...a11yProps(ind)} />;
              })}
            </Tabs>
          </Box>
          {genres.map((genre, ind) => {
            return (
              <CustomTabPanel value={value} index={ind}>
                <Swiper
                  slidesPerView={7}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {data
                    .filter((item) => item.genre.label === genre.label)
                    .map((item) => (
                      <SwiperSlide key={item.id}>
                        <Card
                          follows={item.follows}
                          image={item.image}
                          name={item.title}
                          isSong={true}
                          likes={item.likes}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </CustomTabPanel>
            );
          })}
        </Box>
      )}
    </div>
  );
}

export default Section;
