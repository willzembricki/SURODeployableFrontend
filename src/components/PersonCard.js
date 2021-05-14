import ClockComponent from "./Clock";
import AddRoundForm from "./AddRoundForm";
import RoundsPurchased from "./RoundsPurchased";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import randomColor from "randomcolor";

const StyledDiv = styled.div`
  display: flex;
  flex-grow: inherit;
  justify-content: center;
`;
const StyledPie = styled(PieChart)`
  font-size: 3px;
  text-align: center;
  height: 400px;
`;
const StyledPersonDiv = styled.div`
  width: 840px;
`;

const StyledPersonCardDiv = styled.div`
  border: 2px solid darkgray;
  margin: 3px;
  border-radius: 4px;`

const StyledRoundsPurchasedDiv = styled.div`
  height: 500px;
  overflow: auto;
  display: flex;`

const StyledAddRoundForm = styled.div`
  width: 420px;
  margin: 6px;`

const StyledH1 = styled.h1`
  font-size: 42px;
  margin: 0px;`

function PersonCard({
  person,
  people,
  roundsArr,
  onDeleteRound,
  personRounds,
  onRoundEdit,
}) {
  if (!person) {
    return <h2>Please Select User</h2>;
  }
  if (!people) {
    return <h2>loading...</h2>;
  }

  const pieChartData = people
    .filter((pe) => pe.total > 0)
    .map((peF) => {
      return { title: peF.name, value: peF.total, color: randomColor() };
    });

  return (
    <StyledDiv>
      <StyledPersonDiv>
        <StyledPersonCardDiv>
          <ClockComponent />
          <StyledH1>{person.name}</StyledH1>
          <h2>Total Spending so far is ${person.total}</h2>
          {person.balance >= 0 ? (
            <h2>You are owed ${person.balance.toFixed(2)}</h2>
          ) : (
            <h2>
              {" "}
              Hello, YOU OWE ${Math.abs(person.balance.toFixed(2))}... SquareUp!{" "}
            </h2>
          )}
        </StyledPersonCardDiv>
        <StyledRoundsPurchasedDiv>
          <RoundsPurchased
            personRounds={personRounds}
            people={people}
            onDeleteRound={onDeleteRound}
            rounds={roundsArr}
            person={person}
            onRoundEdit={onRoundEdit}
          />
        </StyledRoundsPurchasedDiv>
      </StyledPersonDiv>
      <StyledAddRoundForm>
        <AddRoundForm
          person={person}
          onForceReload={onRoundEdit}
          people={people}
        />
        <StyledPie
          data={pieChartData}
          label={({ dataEntry }) => dataEntry.title}
        />
      </StyledAddRoundForm>
    </StyledDiv>
  );
}

export default PersonCard;
