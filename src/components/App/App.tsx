// node_modules
import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
// project
import BazaarComp from "components/Bazaar";
import Emoji from "components/Emoji";
import GoodbyeModal from "components/GoodbyeModal";
import Header from "components/Header";
import { FixedButton, FixedRight } from "components/Inputs";
import PurchaseFriendForm from "components/PurchaseFriendForm";
import SelectedFriendForm from "components/SelectedFriendForm";
import Zoo from "components/Zoo";
import { FriendsContextProvider } from "contexts/AvailableFriends";

export default function App(): JSX.Element {
  return (
    <Main>
      <Header />
      <FriendsContextProvider>
        <Routes>
          <Route path="/" element={Home} />
          <Route path="/Bazaar" element={Bazaar} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={FourOhFour} />
        </Routes>
      </FriendsContextProvider>
    </Main>
  );
}

const RoutingButton: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link to={to}>
    <FixedButton>{children}</FixedButton>
  </Link>
);

const ReleaseAll = React.memo(() => {
  const [showRelease, setShowRelease] = React.useState(false);

  return (
    <>
      <FixedRight onClick={() => setShowRelease(true)}>
        Say Goodbye to all of your friends 😿
      </FixedRight>
      {showRelease && <GoodbyeModal setOpen={setShowRelease} allFriends />}
    </>
  );
});

const Main = styled.main`
  display: grid;
  grid-template-rows: auto 50vh 1fr;
  place-items: center;
  isolation: isolate;

  .debug {
    border: 1px dashed pink;
  }
  padding-bottom: 5vmin;
`;

const FourOhFourStyled = styled.div`
  display: grid;
  place-items: center;
  font-size: 5rem;
`;

/*****************************************************************************/
/*                                                                           */
/*                             Plain JSX Bellow                              */
/*                                                                           */
/*****************************************************************************/

const Home = (
  <>
    <Zoo />
    <SelectedFriendForm />
    <RoutingButton to="/Bazaar">
      Find New Friend <Emoji as="span">🔍</Emoji>
    </RoutingButton>
    <ReleaseAll />
  </>
);

const Bazaar = (
  <>
    <BazaarComp />
    <PurchaseFriendForm />
    <RoutingButton to="/">
      Go Back Home <Emoji as="span">🏠</Emoji>
    </RoutingButton>
  </>
);

const FourOhFour = <FourOhFourStyled>¯\_(ツ)_/¯</FourOhFourStyled>;
