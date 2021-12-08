import { useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddItem from "./components/List/AddItem";
import SearchItem from "./components/List/SearchItem";
import Report from "./components/User/Report";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("checkList") || "[]")
  );

  const [newItem, setNewItem] = useState("");
  const [newName, setNewName] = useState(
    JSON.parse(localStorage.getItem("userName")) || "Guest"
  );
  const [searchItem, setSearchItem] = useState("");
  const [report, setReport] = useState("")

  // Save In Local Storage
  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("checkList", JSON.stringify(newItems));
  };

  const saveName = (name) => {
    setNewName(name);
    localStorage.setItem("userName", JSON.stringify(name));
  };

  // Add Item
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  };

  // Handle Check
  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems);
  };

  // Handle Delete
  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  };

  // Handle Add new Item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // call add Item Function
    addItem(newItem);
    setNewItem("");
  };

  // Function to change name
  const changeName = (name) => {
    saveName(name);
  };

  const handleNameChange = () => {
    if (!newName) return;
    changeName(newName);
  };

  // Handle Report
  let reportMessage = newName + "'s daily report: "
  const handleReport = () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        reportMessage = reportMessage.concat(items[i].item, " - Completed, ");
      } else {
        reportMessage = reportMessage.concat(
          items[i].item,
          " - Not Completed, "
        );
      }
    }
    setReport(reportMessage)    
  };

  const copyReport =() => {
    navigator.clipboard.writeText(report)
    setReport("")
    var skypename = "masud alimran";
    window.location = "skype:" + skypename + "?chat";
  }

  return (
    <div className="App">
      <Header title={newName} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(searchItem.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        newName={newName}
        setNewName={setNewName}
        handleNameChange={handleNameChange}
      />
      <Report
        copyReport = {copyReport}
        report = {report}
        handleReport = {handleReport}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
