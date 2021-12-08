import React from "react";
import { FaCheck } from "react-icons/fa";
import { useRef } from "react";

export default function NameChangeForm({
  newName,
  setNewName,
  handleNameChange,
}) {
  const nameRef = useRef();
  if (newName === "Guest") {
    newName = "";
  }
  return (
    <form className="changeNameForm" onSubmit={handleNameChange}>
      <label htmlFor="nameChange">Change Name</label>
      <input
        autoFocus
        ref={nameRef}
        id="nameChange"
        type="text"
        placeholder="Type Name..."
        required
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Change Name"
        onClick={() => nameRef.current.focus()}
      >
        <FaCheck />
      </button>
    </form>
  );
}
