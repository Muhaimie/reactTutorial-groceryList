import React from "react";

const Header = ({ title }) => {
  //This can be use as inline header with style in html tag.
  //   const headerStyle = {
  //     backgroundColor: "royalBlue",
  //     color: "#fff",
  //   };

  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

Header.defaultProps = {
  title: "Default title",
};

export default Header;
