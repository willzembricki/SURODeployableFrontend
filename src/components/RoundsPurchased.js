import RoundEditForm from "./RoundEditForm";
import styled from "styled-components";

const StyledButton = styled.button`
  margin: auto;
  margin-top: 2px;
  margin-bottom: 3px;
  width: 50px;
  text-align: center;
  padding: 0px;
  align-items: center;
  color: ${({ theme }) => theme.toggleBorder};
  background-color: ${({ theme }) => theme.background};
  border-radius: 2px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 3px;
`

const StyledRoundsContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;`

const StyledRoundCard = styled.div`
  width: 160px;
  border: 2px solid darkgray;
  padding: 3px;
  border-radius: 4px;
  height: 240px;
  align-items: center;
  margin: 2px;
  position: relative;`

function RoundsPurchased({
  rounds,
  onDeleteRound,
  personRounds,
  people,
  person,
  onRoundEdit,
}) {
  const filteredRounds = rounds.filter(
    (round) => round.person_id === person.id
  );

  const roundsPurchased = filteredRounds.map((round) => {
    const almostNamesOfDrinkers = personRounds.filter(
      (personRound) => personRound.round_id === round.id
    );
    const userAndDrinkers = people
      .filter((pers) =>
        almostNamesOfDrinkers.find((name) => name.person_id === pers.id)
      )

      .map((pers) => pers.name);
    const namesOfDrinkers = userAndDrinkers
      .filter((drinker) => person.name !== drinker)
      .join(", ");

    return (
      <StyledRoundCard key={round.id}>
        <h6>You bought the round for {namesOfDrinkers}</h6>
        <h5>Round Price ${round.price}</h5>

        <RoundEditForm id={round.id} onRoundEdit={onRoundEdit} />
        <StyledButton onClick={onDeleteRound} value={round.id}>
          Delete
        </StyledButton>
      </StyledRoundCard>
    );
  });

  return <StyledRoundsContainer>{roundsPurchased}</StyledRoundsContainer>;
}
export default RoundsPurchased;
