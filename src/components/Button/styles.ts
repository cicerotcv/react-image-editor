import { shade } from 'polished';
import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;

  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};

  &:active {
    background-color: ${(props) => shade(0.25, props.theme.colors.primary)};
  }
`;

export const StyledIconButton = styled(Button)`
  display: grid;
  grid-template-columns: 1.5rem auto;
  justify-items: center;
  align-items: center;
  gap: 0.25rem;

  i {
    padding: 0.25rem;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`;
