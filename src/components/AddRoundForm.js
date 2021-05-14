import Select from "react-select";
import { useState } from "react";
import styled from 'styled-components'

const StyledInput = styled.input`
  margin: 4px;
  border-radius: 2px;`

const StyledSubmitInput = styled.input`
  margin: auto;
  margin-top: 4px;
  margin-bottom: 2px;
  width: 150px;
  text-align: center;
  padding: 0px;
  align-items: center;
  color: ${({ theme }) => theme.toggleBorder};
  background-color: ${({ theme }) => theme.background};
  border-radius: 2px;
  cursor: pointer;`

const selectStyles = {
  option: (provided) => ({
    ...provided,
    color: 'gray',
  })}

function AddRoundForm({ people, onForceReload, person }) {
  const [roundPrice, setRoundPrice] = useState("");
  const [peopleDrinking, setPeopleDrinking] = useState([]);

  const filterArr = people.filter((pers) => pers.id !== person.id);
  const selectPeople = filterArr.map((pers) => {
    return { value: `${pers.id}`, label: `${pers.name}` };
  });
  function handleSelections(e) {
    setPeopleDrinking(e.map((val) => val.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9393/rounds", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        price: roundPrice,
        person_id: person.id,
        people_drinking: peopleDrinking,
      }),
    }).then((res) => res.json())
    .then(data => {
        onForceReload(data)}
        );
    setRoundPrice("");
    setPeopleDrinking([]);
  }
  return ( <>
    <h2>Add A Round Of Drinks</h2>
    <br/>
    <form onSubmit={handleSubmit}>
      <StyledInput
        type="number"
        placeholder="Price for Round"
        value={roundPrice}
        step=".01"
        onChange={(e) => setRoundPrice(e.target.value)}
        required
      />
      <Select styles={selectStyles} isMulti options={selectPeople} onChange={handleSelections} />
      <StyledSubmitInput type="submit" value="Buy The Round" />
    </form>
    </>
  );
}

export default AddRoundForm;
