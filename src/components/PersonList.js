import React from "react";
import styled from "styled-components";

import PersonButton from "./PersonButton";

const StyledDiv = styled.div`
  border-radius: 6px;
  justify-content: center;
  width: 1100px;`



function PersonList({ people, onCurrentP }) {
  const personButtons = people.map((person) => {
    return (
      <PersonButton
        key={person.id}
        person={person}
        onCurrentP={onCurrentP}
      />
    );
  });

  return <StyledDiv>{personButtons}</StyledDiv>;
}

export default PersonList;
