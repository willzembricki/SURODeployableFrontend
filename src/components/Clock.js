import React from "react";

import Clock from "react-live-clock";
import styled from "styled-components";

const StyledClock = styled(Clock)`
  font-size: 50px;
`;
export default class ClockComponent extends React.Component {
  render() {
    return (
      <StyledClock format={"hh:mm:ss A"} ticking={true} timezone={"US/Eastern"} />
    );
  }
}
