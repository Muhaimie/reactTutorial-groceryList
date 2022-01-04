import React from "react";

const SearchItem = ({ searchItem, setSearchItem, handleSearchItem }) => {
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
        onChange={(e)=>{handleSearchItem(e.target.value)}}
      />
    </form>
  );
};

export default SearchItem;
