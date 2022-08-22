// node_modules
import React from "react";
import styled from "styled-components";
// project
import ZooImg from "assets/prairy.png";
import AnimalFriend from "components/AnimalFriend";
import { useFriends } from "contexts/AvailableFriends";

function Zoo() {
  const { friends, setSelectedFriend } = useFriends();
  return (
    <StyledZoo src={ZooImg} tabIndex={0}>
      {Object.entries(friends).map(([name, props]) => (
        <AnimalFriend
          key={name}
          name={name}
          {...props}
          emoji={props.emoji}
          onClick={() => {
            setSelectedFriend((old) => (old === name ? undefined : name));
          }}
        />
      ))}
    </StyledZoo>
  );
}

export default React.memo(Zoo);

const StyledZoo = styled.section<{ src: string }>`
  --f-size: 6rem;

  display: flex;
  align-items: end;
  contain: content;
  flex-wrap: wrap;

  width: 1024px;
  max-height: 1024px;
  height: 100%;
  background-image: url(${(p) => p.src});
  background-position: bottom left;
  background-origin: content-box;
`;
