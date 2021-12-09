import { useState, useEffect } from "react";
import apiRequest from "./api/apiRequest";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddItem from "./components/List/AddItem";
import SearchItem from "./components/List/SearchItem";
import Report from "./components/User/Report";

function App() {
  // jSON API
  const API_URL_ITEMS = "http://localhost:3600/items";
  const API_URL_NAME = "http://localhost:3600/name";

  // Item State
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Name States
  const [newName, setNewName] = useState(
    // JSON.parse(localStorage.getItem("userName")) || "Guest"
    []
  );

  // Search States
  const [searchItem, setSearchItem] = useState("");

  // Skype Reports State
  const [report, setReport] = useState("");
  const [skypeName, setSkypeName] = useState(
    JSON.parse(localStorage.getItem("skypeUser")) || ""
  );

  // TODO Save In Local Storage
  // Items use effect
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL_ITEMS);
        if (!response.ok) throw Error("Did not recieve expected Data");
        const items = await response.json();
        setItems(items);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  // name use effect
  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await fetch(API_URL_NAME);
        if (!response.ok) throw Error("Did not recieve name Data");
        const name = await response.json();
        setNewName(name[0].user);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchName();
  }, []);

  useEffect(() => {
    localStorage.setItem("skypeUser", JSON.stringify(skypeName));
  }, [skypeName]);

  // TODO Item Item Functions
  // add item function
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    // in JSON
    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL_ITEMS, postOptions);
    if (result) setFetchError(result);
  };

  // Handle Check
  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    // in JSON
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL_ITEMS}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL_ITEMS}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  // Handle Add new Item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // call add Item Function
    addItem(newItem);
    setNewItem("");
  };

  // TODO Name Functions
  // Function to change name
  const changeName = async (user) => {
    setNewName(user);

    // in JSON
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    };
    const reqUrl = `${API_URL_NAME}/1`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleNameChange = () => {
    if (!newName) return;
    changeName(newName);
  };

  // TODO Report functions
  // Function to add Skype User
  // Save skype name in Localstorage
  const changeSkypeName = (user) => {
    setSkypeName(user);
  };

  // Handle skype name
  const handleSkypeName = () => {
    if (!skypeName) return;
    changeSkypeName(skypeName);
  };

  // Handle Report
  let reportMessage = newName + "'s daily report: ";
  const handleReport = () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        reportMessage = reportMessage.concat(items[i].item, " ✅, ");
      } else {
        reportMessage = reportMessage.concat(items[i].item, " ❌, ");
      }
    }
    setReport(reportMessage);
  };

  // copy report and open skype
  const copyReport = () => {
    navigator.clipboard.writeText(report);
    setReport("");
    window.location = "skype:" + skypeName + "?chat";
  };

  // ! Render
  return (
    <div className="App">
      <Header title={newName} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(searchItem.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            newName={newName}
            setNewName={setNewName}
            handleNameChange={handleNameChange}
            skypeName={skypeName}
            setSkypeName={setSkypeName}
            handleSkypeName={handleSkypeName}
          />
        )}
      </main>
      <Report
        copyReport={copyReport}
        report={report}
        handleReport={handleReport}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
