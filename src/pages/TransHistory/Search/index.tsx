import React, { useState } from "react";

const Search = (onSearch: (a: string) => void) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value: string) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <input
      type="text"
      style={{ width: "240px" }}
      placeholder="search"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default Search;
