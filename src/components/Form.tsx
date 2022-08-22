// node_modules
import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// project
import { Friend } from "components/AnimalFriend";
import { ANIMAL_EMOJI } from "components/AnimalFriend/AnimalFriend.constants";
import Emoji from "components/Emoji";
import GoodbyeModal from "components/GoodbyeModal";
import * as StyledInputs from "components/Inputs";
import { useFriends } from "contexts/AvailableFriends";
import useBoop from "hooks/useBoop";
import { IIFE } from "utils/pureFunctions";

type Data = Partial<Friend>;

const Form: React.FC<{
  onSubmit: (data: Data) => void;
  isExisting?: boolean;
  friend: Omit<Data, "name">;
  name?: string;
}> = ({ onSubmit, friend, name, isExisting }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Data>({ mode: "onBlur" });

  const currentEmoji = watch("emoji") ?? friend.emoji;

  const [showRelease, setShowRelease] = React.useState(false);
  const { friends } = useFriends();

  const nameValidation = React.useMemo(() => {
    const listNames = Object.keys(friends);

    return {
      disabled: isExisting,
      validate: (value?: string) => {
        if (!value || !value.includes(" ")) {
          return "Pets must have (at least) a first and last name!";
        }

        if (listNames.includes(value)) {
          return "There is already a friend with that name!";
        }
      },
    };
  }, [friends, isExisting]);

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Emoji
          $fSize={"4rem"}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {currentEmoji}
        </Emoji>
        {!isExisting && (
          <Select
            label="emoji"
            errorMessage={errors.emoji?.message}
            {...register("emoji", { required: true })}
          >
            {ANIMAL_EMOJI.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        )}
        <Input
          label="name"
          defaultValue={name}
          {...register("name", nameValidation)}
          errorMessage={errors.name?.message}
        />
        <Input
          label="shyness"
          defaultValue={friend.shyness}
          type="number"
          {...register("shyness", ShynessValidation)}
          title="Shy Friends like to stay away from others!"
          errorMessage={errors.shyness?.message}
        />
        <Menu {...{ isValid, setShowRelease, isExisting }} />
      </StyledForm>
      {showRelease && <GoodbyeModal setOpen={setShowRelease} />}
    </>
  );
};

const ShynessValidation = {
  min: {
    value: -100,
    message: "This friend is waaaayyy too extroverted!",
  },
  max: { value: 100, message: "This friend is waaaayyy too shy!" },
  valueAsNumber: true,
} as const;

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    errorMessage?: React.ReactNode;
    asSelect?: boolean;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, errorMessage, ...delegated }, ref) => {
  const id = React.useId();
  const [style, trigger] = useBoop({ x: 5 });

  React.useEffect(() => {
    if (errorMessage) {
      trigger();
    }
  }, [errorMessage, trigger]);

  return (
    <InputWrapper>
      <label htmlFor={id}>{label}</label>
      <StyledInputs.Input
        id={id}
        {...delegated}
        as={animated.input}
        ref={ref}
        style={style}
      />
      {errorMessage && <FadeInError>{errorMessage}</FadeInError>}
    </InputWrapper>
  );
});

const Select = React.forwardRef<
  HTMLSelectElement,
  {
    label: string;
    errorMessage?: React.ReactNode;
    asSelect?: boolean;
  } & React.InputHTMLAttributes<HTMLSelectElement>
>(({ label, errorMessage, ...delegated }, ref) => {
  const id = React.useId();
  const [style, trigger] = useBoop({ x: 5 });

  React.useEffect(() => {
    if (errorMessage) {
      trigger();
    }
  }, [errorMessage, trigger]);

  return (
    <InputWrapper>
      <label htmlFor={id}>{label}</label>
      <StyledInputs.Select
        id={id}
        {...delegated}
        as={animated.select}
        ref={ref}
        style={style}
      />
      {errorMessage && <FadeInError>{errorMessage}</FadeInError>}
    </InputWrapper>
  );
});

function Menu({
  isValid,
  setShowRelease,
  isExisting,
}: {
  isValid: boolean;
  setShowRelease: React.Dispatch<React.SetStateAction<boolean>>;
  isExisting?: boolean;
}) {
  return (
    <StyledMenu>
      <StyledInputs.Button type="submit" disabled={!isValid}>
        {IIFE(() => {
          if (!isValid) {
            return "Can't Save Changes 💔";
          }

          return "Save Changes ❤️ ";
        })}
      </StyledInputs.Button>
      {isExisting && (
        <StyledInputs.Button
          onClick={(event) => {
            event.preventDefault();
            setShowRelease(true);
          }}
        >
          Release Friend 😢
        </StyledInputs.Button>
      )}{" "}
    </StyledMenu>
  );
}

const FadeInError: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fadeIn = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: -50 },
  });

  return <animated.p style={fadeIn}>{children}</animated.p>;
};

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${Emoji} {
    cursor: default;
  }

  label {
    text-transform: capitalize;
  }
`;

const StyledMenu = styled.menu`
  display: grid;
  place-items: center;
  grid-auto-flow: column;
  gap: 1rem;

  padding: 0;

  button {
    width: 100%;
  }
`;

export default React.memo(Form);
