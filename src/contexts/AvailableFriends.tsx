import { Friend } from "components/AnimalFriend";
import React from "react";
import { SetState } from "utils/typeHelpers";

/**
 * Names must be unique - so we group all of our friends on an object
 */
type Friends = { [s in string]: Omit<Friend, "name"> };

export type FriendsContext = {
  friends: Friends;
  setFriends: SetState<Friends>;
  selectedFriend?: keyof Friends;
  setSelectedFriend: SetState<keyof Friends | undefined>;
};

export const FriendsContextObject = React.createContext<
  FriendsContext | undefined
>(undefined);

export function useFriends(): FriendsContext {
  const context = React.useContext(FriendsContextObject);
  if (!context) {
    throw Error("Called useFriends outside it's context!");
  }
  return context;
}

const DEFAULT_FRIENDS = {
  "Bobby Boy": {
    emoji: "🐃",
    boop: { scale: 1.2 },
    shyness: 15,
  },
  "Prancing Buttercup": {
    emoji: "🐎",
    boop: { y: 5 },
    shyness: -50,
  },
  "Solid Fellow": {
    emoji: "🐍",
    boop: { rotation: 30 },
    shyness: 50,
  },
} as const;

const getFriends = () => {
  const stored = localStorage.getItem("friends");
  if (!stored) {
    localStorage.setItem("friends", JSON.stringify(DEFAULT_FRIENDS));
    return DEFAULT_FRIENDS;
  }
  return JSON.parse(stored) as Friends;
};

export const FriendsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [friends, setFriends] = React.useState<Friends>(getFriends);
  const [selectedFriend, setSelectedFriend] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {
    try {
      localStorage.setItem("friends", JSON.stringify(friends));
    } catch (e) {
      console.error("failed to save to local storage", e);
    }
  });

  return (
    <FriendsContextObject.Provider
      value={{ friends, setFriends, selectedFriend, setSelectedFriend }}
    >
      {children}
    </FriendsContextObject.Provider>
  );
};
