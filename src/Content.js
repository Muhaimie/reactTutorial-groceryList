import React from "react";
import LineItem from "./LineItem";

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <LineItem
              item={item}
              key={item.id}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p style={{ color: "red", marginTop: "2rem" }}>
          No list available at the moment.
        </p>
      )}
    </main>
  );
};

export default Content;
