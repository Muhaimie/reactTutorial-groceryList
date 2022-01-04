import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList"))
    // [{
    //   id:1,
    //   checked:false,
    //   item:"test"
    // }]
  );

  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const setAndSaveItems = (listItems) => {
    setItems(listItems);
    // to make sure it get stored even the app closed or get reloaded
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  };

  const handleCheck = (id) => {
    var listItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });

    setAndSaveItems(listItems);
  };

  const handleDelete = (id) => {
    var listItems = items.filter((item) => {
      return item.id !== id;
    });

    setAndSaveItems(listItems);
  };

  const addItem = (item) => {
    const addedItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      checked: false,
      item: item,
    };

    const listItems = [...items,addedItem];
    setAndSaveItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) {
      return;
    }
    addItem(newItem);
    setNewItem("");
  };

  const handleSearchItem = (item)=>{

    setSearchItem(item);
  }

  return (
    <div className="App">
      <Header title="Grocery list" />
      <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} handleSearchItem={handleSearchItem} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content
        items={items.filter((item) => {
          return item.item.toLowerCase().includes(searchItem.toLowerCase());
        })}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
