// node_modules
import React from "react";
// project
import { Friend, makeBoop } from "components/AnimalFriend";
import Form from "components/Form";
import { useFriends } from "contexts/AvailableFriends";
import { useNavigate } from "react-router-dom";

const PurchaseFriendForm = () => {
  const { setFriends } = useFriends();
  const navigate = useNavigate();

  const onSubmit = React.useCallback(
    (data: Partial<Friend>) => {
      const name = data.name;
      if (!name) {
        throw Error("Shouldn't happen");
      }

      setFriends((prev) => ({
        ...prev,
        [name]: { ...prev[name], ...data },
      }));
      navigate("/");
    },
    [setFriends, navigate]
  );

  const friend: Partial<Friend> = React.useMemo(
    () => ({ boop: makeBoop(), shyness: 0 }),
    []
  );

  return <Form {...{ onSubmit, friend }} />;
};

export default React.memo(PurchaseFriendForm);
