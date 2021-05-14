//Form to add a person, it only needs the person's name, make it a hidden form
import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 2px;
`;

const StyledSubmitInput = styled.input`
  margin: auto;
  margin-top: 2px;
  margin-bottom: 2px;
  width: 100px;
  text-align: center;
  padding: 0px;
  align-items: center;
  color: ${({ theme }) => theme.toggleBorder};
  background-color: ${({ theme }) => theme.background};
  border-radius: 2px;
  cursor: pointer;
`;

function AddPersonForm({ onAddPerson }) {
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://radiant-cliffs-08519.herokuapp.com/people", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => onAddPerson(data));
    setName("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <StyledInput
        required
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledSubmitInput type="submit" value="Add Drinker" />
    </form>
  );
}

export default AddPersonForm;
