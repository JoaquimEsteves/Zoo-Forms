import { animated, AnimatedComponent } from "@react-spring/web";
import React from "react";
// project
import Emoji, { Props as EmojiProps } from "components/Emoji";
import useBoop, { Boop } from "hooks/useBoop";
import { isNotNullish } from "utils/pureFunctions";
import { ANIMAL_EMOJI } from "./AnimalFriend.constants";

export type Friend = {
  emoji: typeof ANIMAL_EMOJI[number];
  name?: string;
  boop?: Boop;
  shyness?: number;
  children?: never;
};

export const AnimalFriend: React.FC<
  Friend & EmojiProps & { as?: AnimatedComponent<keyof typeof animated> } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  boop,
  name = "Mysterious Nameless Friend",
  as = animated.button,
  emoji,
  shyness,
  ...rest
}) => {
  const boopProps = React.useMemo(
    () => (isNotNullish(boop) ? boop : makeBoop()),
    [boop]
  );
  const [style, trigger] = useBoop(boopProps);

  return (
    <Emoji
      title={name}
      $shyness={shyness}
      as={as}
      // Make them focusable by default so we can tab-through 'em
      tabIndex={0}
      {...rest}
      children={emoji}
      style={style}
      onMouseEnter={trigger}
      onFocus={trigger}
    />
  );
};

export const makeBoop = (): Boop => {
  if (Math.random() >= 0.5) {
    return { y: 5 };
  }
  if (Math.random() >= 0.5) {
    return { rotation: 15 };
  }
  return { scale: 1.2 };
};

export default React.memo(AnimalFriend);
