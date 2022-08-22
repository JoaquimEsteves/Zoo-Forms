import styled, { css } from "styled-components";

const FixColor = css`
  background: var(--backgroundLight);
  color: var(--color);
  border-color: var(--color);
  border-radius: 5px;

  &:disabled {
    background: var(--background);
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  ${FixColor}
  cursor: pointer;

  padding-inline: 0.5em;
`;

export const Input = styled.input`
  ${FixColor};
  padding-inline: 1rem;
`;

export const Select = styled(Input)`
  font-family: "Noto Color Emoji", sans-serif;
`;

export const FixedButton = styled(Button)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`;

export const FixedRight = styled(FixedButton)`
  left: unset;
  right: 1rem;
`
