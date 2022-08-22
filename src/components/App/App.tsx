// node_modules
import { Link, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
// project
import BazaarComp from "components/Bazaar";
import Emoji from "components/Emoji";
import Header from "components/Header";
import { Button } from "components/Inputs";
import PurchaseFriendForm from "components/PurchaseFriendForm";
import SelectedFriendForm from "components/SelectedFriendForm";
import Zoo from "components/Zoo";
import { FriendsContextProvider } from "contexts/AvailableFriends";

export default function App(): JSX.Element {
  return (
    <Main>
      <Header />
      <FriendsContextProvider>
        <Routing />
      </FriendsContextProvider>
    </Main>
  );
}

const Routing = () => (
  <>
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/Bazaar" element={Bazaar} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={FourOhFour} />
    </Routes>
  </>
);

const RoutingButton: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link to={to}>
    <FixedButton>{children}</FixedButton>
  </Link>
);

const Home = (
  <>
    <Zoo />
    <SelectedFriendForm />
    <RoutingButton to="/Bazaar">
      Find New Friend <Emoji>🔍</Emoji>
    </RoutingButton>
  </>
);

const Bazaar = (
  <>
    <BazaarComp />
    <PurchaseFriendForm />
    <RoutingButton to="/">
      Go Back Home <Emoji>🏠</Emoji>
    </RoutingButton>
  </>
);

const FourOhFourStyled = styled.div`
  display: grid;
  place-items: center;
  font-size: 5rem;
`;

const FourOhFour = <FourOhFourStyled>¯\_(ツ)_/¯</FourOhFourStyled>;

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

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`;
