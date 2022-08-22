// node_modules
import React from "react";
// project
import { Friend } from "components/AnimalFriend";
import Form from "components/Form";
import { useFriends } from "contexts/AvailableFriends";

type Data = Partial<Omit<Friend, "name">>;

const SelectedFriendForm = () => {
  const { selectedFriend, friends, setFriends } = useFriends();

  const onSubmit = React.useCallback(
    (data: Data) =>
      setFriends((prev) => ({
        ...prev,
        [selectedFriend ?? ""]: { ...prev[selectedFriend ?? ""], ...data },
      })),
    [selectedFriend, setFriends]
  );

  if (!selectedFriend) {
    return null;
  }

  const friend = friends[selectedFriend];

  if (!friend) {
    return null;
  }

  return (
    <Form
      {...{ onSubmit, friend }}
      name={selectedFriend}
      isExisting
      key={selectedFriend}
    />
  );
};

export default React.memo(SelectedFriendForm);
