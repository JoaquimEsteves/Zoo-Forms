// node_modules
import { animated, useSpring } from "@react-spring/web";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "usehooks-ts";
// project
import FreedomImg from "assets/freedom.png";
import ReleaseImg from "assets/releasing.png";
import InPortal from "components/InPortal";
import { useFriends } from "contexts/AvailableFriends";
import { SetState } from "utils/typeHelpers";
import { Button } from "components/Inputs";
import Emoji from "./Emoji";

const GoodbyeModal: React.FC<{
  setOpen: SetState<boolean>;
}> = ({ setOpen }) => {
  const ref = React.useRef<HTMLElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  const { setFriends, friends, selectedFriend, setSelectedFriend } =
    useFriends();

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const src = React.useMemo(
    () => (Math.random() >= 0.5 ? FreedomImg : ReleaseImg),
    []
  );

  return (
    <FixedPortal>
      <Modal style={fadeIn} ref={ref} tabIndex={0}>
        <Img src={src} />
        <div>
          <h2>Return {selectedFriend} back to nature?</h2>
          <Emoji $fSize={100}>{friends[selectedFriend ?? ""]?.emoji}</Emoji>
          <Button
            onClick={() => {
              setFriends((prev) => {
                if (!selectedFriend) {
                  throw Error("I was called when there is no selected friend!");
                }
                const cpy = { ...prev };
                delete cpy[selectedFriend];
                return cpy;
              });
              setOpen(false);
              setSelectedFriend(undefined);
            }}
          >
            Yes 😭
          </Button>
        </div>
      </Modal>
    </FixedPortal>
  );
};

export default React.memo(GoodbyeModal);

const FixedPortal = styled(InPortal)`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled(animated.section)`
  width: 50%;
  height: 50%;
  z-index: 1;
  background: var(--backgroundLight);
  color: var(--color);
  font-size: 1.5rem;

  display: grid;
  place-items: center;
  grid-template-columns: 50vmin 1fr;
  overflow: scroll;

  & > div {
    display: grid;
    place-items: center;
    gap: 1rem;
    height: 100%;
  }
`;

const Img = styled.img`
  height: 100%;
`;
