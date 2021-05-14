import "./App.css";
import AddPersonForm from "./components/AddPersonForm";
import NavBar from "./components/NavBar";
import PersonList from "./components/PersonList";
import PersonCard from "./components/PersonCard";
// import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode";
import { GlobalStyles } from "./components/Globalstyles";
import { lightTheme, darkTheme } from "./components/DarkModeTheme";
import { useState, useEffect } from "react";
import Toggle from "./components/ToggleDarkMode";

const StyledDiv = styled.div`
  text-align: center;`


function App() {
  const [peopleArr, setPeopleArr] = useState([]);
  const [currentP, setCurrentP] = useState(null);
  const [roundsArr, setRoundsArr] = useState([]);
  const [personRoundsArr, setPersonRoundsArr] = useState([]);
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    fetch("http://localhost:9393/people")
      .then((res) => res.json())
      .then((people) => setPeopleArr(people));
    fetch("http://localhost:9393/rounds")
      .then((res) => res.json())
      .then((rounds) => setRoundsArr(rounds));
    fetch("http://localhost:9393/person_rounds")
      .then((res) => res.json())
      .then((personRounds) => setPersonRoundsArr(personRounds));
  }, []);

  function handleRoundEdit(roundAndPRArr) {
    setRoundsArr(roundAndPRArr[0]);
    setPersonRoundsArr(roundAndPRArr[1]);
    setPeopleArr(roundAndPRArr[2]);
    setCurrentP(roundAndPRArr[2].find((person) => person.id === currentP.id));
  }

  function handleCurrentP(id) {
    console.log(peopleArr)
    const thisP = peopleArr.find((person) => person.id === parseInt(id));
    setCurrentP(thisP);
  }

  function handleDeleteRound(e) {
    fetch(`http://localhost:9393/rounds/${e.target.value}`, {
      method: "DELETE",
    }).then(res => res.json())
     .then(roundAndPRArr => {
      setRoundsArr(roundAndPRArr[0]);
      setPersonRoundsArr(roundAndPRArr[1]);
      setPeopleArr(roundAndPRArr[2]);
      setCurrentP(roundAndPRArr[2].find((person) => person.id === currentP.id));
    });
  }

  function handleAddPerson(data) {
    setPeopleArr([...peopleArr, data]);
  }

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="App">
          <StyledDiv>
          <NavBar />
          <Toggle theme={theme} toggleTheme={themeToggler} />
          </StyledDiv>
          <div>
            <PersonList onCurrentP={handleCurrentP} people={peopleArr} />
            <AddPersonForm onAddPerson={handleAddPerson} />
          </div>
          <PersonCard
            person={currentP}
            people={peopleArr}
            roundsArr={roundsArr}
            onDeleteRound={handleDeleteRound}
            personRounds={personRoundsArr}
            onRoundEdit={handleRoundEdit}
          />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
