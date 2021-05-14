import React from "react";

import styled from 'styled-components'

const StyledButton = styled.button`
  margin: 3px;
  border-radius: 3px;
  padding: 6px;
  font-size: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.toggleBorder};
  background-color: ${({ theme }) => theme.background};
  width: 160px;
  `

function PersonButton({ person, onCurrentP }) {
  function HelpDaClick() {
    onCurrentP(person.id);
  
  }

  return <StyledButton onClick={HelpDaClick}>{person.name}</StyledButton>;
}

export default PersonButton;
