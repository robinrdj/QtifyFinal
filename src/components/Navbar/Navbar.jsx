import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";
import Hero from "../Hero/Hero";
function Navbar({ searchData }) {
  return (
    <div>
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <Button content={"Give Feedback"} />
    </nav>
    <Hero />
    </div>

    
  );
}

export default Navbar;
