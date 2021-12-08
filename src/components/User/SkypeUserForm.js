import React from "react";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa";

export default function SkypeUserForm({
  skypeName,
  setSkypeName,
  handleSkypeName,
}) {
  const skypeRef = useRef();
  
  return (
    <form className="changeNameForm" onSubmit={handleSkypeName}>
      <label htmlFor="skypeNameChange">Skype Username ...</label>
      <input
        autoFocus
        ref={skypeRef}
        id="skypeNameChange"
        type="text"
        placeholder="Skype Username ..."
        required
        value={skypeName}
        onChange={(e) => setSkypeName(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Change Skype Username"
        onClick={() => skypeRef.current.focus()}
      >
        <FaCheck />
      </button>
    </form>
  );
}
