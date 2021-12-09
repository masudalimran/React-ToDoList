import React from "react";
import { FaSkype } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import ListItem from "./List/ListItem";
import NameChangeForm from "./User/NameChangeForm";
import SkypeUserForm from "./User/SkypeUserForm";

export default function Content({
  items,
  handleCheck,
  handleDelete,
  newName,
  setNewName,
  handleNameChange,
  skypeName,
  setSkypeName,
  handleSkypeName,
}) {
  // Name
  const [viewNameChange, setViewNameChange] = useState(false);
  const viewNameForm = () => {
    const x = !viewNameChange;
    setViewNameChange(x);
  };
  // Skype
  const [skypeUser, setSkypeuser] = useState(false);
  const skypeForm = () => {
    const x = !skypeUser;
    setSkypeuser(x);
  };

  return (
    <>
      <p>Hello {newName}!</p>
      <div>
        <button className="changeName" onClick={viewNameForm}>
          Change Name
        </button>
        <button onClick={skypeForm}>
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
      {/* Skype */}
      {skypeUser ? (
        <SkypeUserForm
          skypeName={skypeName}
          setSkypeName={setSkypeName}
          handleSkypeName={handleSkypeName}
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
    </>
  );
}
