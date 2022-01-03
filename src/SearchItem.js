import React from "react";

const SearchItem = ({ searchItem, setSearchItem }) => {
  return (
    <form
      className="searchForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="searchItem"
        role="searchbox"
        placeholder="Seach Item"
        value={searchItem}
      />
    </form>
  );
};

export default SearchItem;
