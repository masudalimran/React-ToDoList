import React from "react";
import { FaSkype } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import ListItem from "./List/ListItem";
import NameChangeForm from "./User/NameChangeForm";

export default function Content({
  items,
  handleCheck,
  handleDelete,
  newName,
  setNewName,
  handleNameChange,
}) {
  const [viewNameChange, setViewNameChange] = useState(false);
  const viewNameForm = () => {
    const x = !viewNameChange;
    setViewNameChange(x);
  };

  return (
    <main>
      <p>Hello {newName}!</p>
      <div>
        <button className="changeName" onClick={viewNameForm}>
          Change Name
        </button>
        <button onClick={viewNameForm}>
          <FaSkype />
        </button>
      </div>
      {viewNameChange ? (
        <NameChangeForm
          newName={newName}
          setNewName={setNewName}
          handleNameChange={handleNameChange}
        />
      ) : (
        <span></span>
      )}
      {items.length ? (
        <ListItem
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your List Is Empty</p>
      )}
    </main>
  );
}
