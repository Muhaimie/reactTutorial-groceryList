import React from "react";

function Footer({ length }) {
  const today = new Date();

  return (
    <footer>
      <p>There is {length} item(s) in this list.</p>
    </footer>
  );
}

export default Footer;
