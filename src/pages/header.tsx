import React, { useState, useEffect } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import classes from "./header.module.scss";

const Headerr: React.FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h2 className={classes.header__content__logo}>Expense Tracker</h2>

        <nav className={classes.header__content__nav}>
          <ul>
            <li>
              <a href="/">Dashboard</a>
            </li>

            <li>
              <a href="/History">History</a>
            </li>
            <li>
              <a href="/AddNewCategories">Add New Category</a>
            </li>
          </ul>
          <div className={classes.header__content__toggle}>
            <BiMenuAltRight />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Headerr;
