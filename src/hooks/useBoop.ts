/**
 * Stolen from the brilliant Josh-Comeau
 * See: https://www.joshwcomeau.com/snippets/react-hooks/use-boop/
 */
import React from "react";
import { SpringValue, useSpring, UseSpringProps } from "@react-spring/web";

export type Boop = {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: UseSpringProps["config"];
};

export const DefaultSpring = {
  tension: 300,
  friction: 10,
} as const;

function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = DefaultSpring,
}: Boop): [
  {
    transform: SpringValue<string>;
  },
  () => void
] {
  const [isBooped, setIsBooped] = React.useState(false);
  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });
  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);

  return [style, trigger];
}

export default useBoop;
