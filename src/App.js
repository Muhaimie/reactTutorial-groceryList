import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";
function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not received expected data.");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const handleCheck = async (id) => {
    var listItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });

    setItems(listItems);
    //This is for db, unlike for state, for db we dont want to update whole table
    //Remember items is still not updating yet here even we setItems.
    const listItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ checked: listItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleDelete = async (id) => {
    var listItems = items.filter((item) => {
      return item.id !== id;
    });

    setItems(listItems);

    const deleteItem = items.filter((item) => item.id === id);
    const deleteOptions = {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteItem[0]),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const addItem = async (item) => {
    const addedItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      checked: false,
      item: item,
    };

    const listItems = [...items, addedItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) {
      return;
    }
    addItem(newItem);
    setNewItem("");
  };

  const handleSearchItem = (item) => {
    setSearchItem(item);
  };

  return (
    <div className="App">
      <Header title="Grocery list" />
      <SearchItem
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        handleSearchItem={handleSearchItem}
      />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <main>
        {isLoading && <p>The content is still loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) => {
              return item.item.toLowerCase().includes(searchItem.toLowerCase());
            })}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
