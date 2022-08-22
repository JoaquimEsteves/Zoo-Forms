// node_modules
import React from "react";
import styled from "styled-components";
// project
import BazaarImg from "assets/getting_pets.png";

function Bazaar() {
  return <StyledBazaar src={BazaarImg} tabIndex={-1} />;
}

export default React.memo(Bazaar);

const StyledBazaar = styled.section<{ src: string }>`
  width: 1024px;
  max-height: 1024px;
  height: 100%;
  background-image: url(${(p) => p.src});
  background-position: bottom left;
  background-origin: content-box;
`;
