import React from "react";
import styled, { css } from "styled-components";
// project
import * as U from "utils/pureFunctions";

export type Props = {
  $fSize?: React.CSSProperties["fontSize"];
  /**
   * ie: margin-left, margin-right. I think it was cute
   */
  $shyness?: number;
} & {
  [s in `$${"top" | "left" | "right" | "bottom"}`]?: number;
};

const Emoji = styled.button<Props>`
  cursor: pointer;
  padding: 0;
  background: unset;
  border: unset;

  display: inline-block;
  font-family: "Noto Color Emoji", sans-serif;
  font-size: var(
    --f-size,
    ${({ $fSize }) => U.interpolateSize($fSize, "auto")}
  );

  margin-inline: ${({ $shyness }) => U.interpolateSize($shyness)};

  ${(props) => {
    const { $top, $right, $bottom, $left } = props;
    if ([$top, $right, $bottom, $left].every(U.isNullish)) {
      return "";
    }
    // shoot - it means we WANT to adjust something!
    // We'll let styled-components interpolation handle most of it
    return css`
      position: relative;
      top: ${U.interpolateSize($top, undefined)};
      right: ${U.interpolateSize($right, undefined)};
      left: ${U.interpolateSize($left, undefined)};
      bottom: ${U.interpolateSize($bottom, undefined)};
    `;
  }}
`;

export default Emoji;
