// node_modules
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// project
import AnimalFriend from "components/AnimalFriend";

const Header = React.memo(() => (
  <StyledHeader>
    <h1>
      Zoo Forms{" "}
      <Link to="/">
        <AnimalFriend
          title="Go Home"
          emoji="🦦"
          $top={-6}
          boop={{ rotation: 15, y: -5 }}
        />
      </Link>
    </h1>
  </StyledHeader>
));

export default React.memo(Header);

const StyledHeader = styled.header`
  padding: 5vmin 1rem;

  h1 {
    font-size: 4rem;
  }
`;
