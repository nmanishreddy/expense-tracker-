import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import "./header1.css";

const Header1: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Dashboard");
    } else if (location.pathname === "/History") {
      setActiveTab("History");
    } else if (location.pathname === "/AddNewCategories") {
      setActiveTab("AddNewCategories");
    } else if (location.pathname === "/AddEdit") {
      setActiveTab("AddEdit");
    }
  }, [location]);

  return (
    <div className="header">
      <p className="logo">Expense Tracker</p>
      <div className="header-right">
        <Link to="/AddNewCategories">
          <p
            className={`${activeTab === "AddNewCategories" ? "active" : ""}`}
            onClick={() => setActiveTab("AddNewCategories")}
          >
            Add New Category
          </p>
        </Link>

        <Link to="/">
          <p
            className={`${activeTab === "Dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("Dashboard")}
          >
            Dashboard
          </p>
        </Link>

        <Link to="/History">
          <p
            className={`${activeTab === "History" ? "active" : ""}`}
            onClick={() => setActiveTab("History")}
          >
            History
          </p>
        </Link>
        {/* <Link to="/curr">
          <p
            className={`${activeTab === "Currency" ? "active" : ""}`}
            onClick={() => setActiveTab("Currency")}
          >
            Currency
          </p>
        </Link> */}
      </div>
    </div>
  );
};

export default Header1;
