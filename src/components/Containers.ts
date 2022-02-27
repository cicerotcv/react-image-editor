import { shade } from 'polished';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${(props) => shade(-0.25, props.theme.colors.background)};
  box-shadow: 0 5px 15px
    ${(props) => shade(0.25, props.theme.colors.background)};
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90vw;
  margin: 0.5rem auto;

  width: 100%;

  align-self: center;
  justify-self: center;
`;

export const ControllersCard = styled(Card)`
  height: 100%;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

export const Stack = styled.div`
  display: grid;
  margin: 1rem auto;
  max-width: 90vw;
  gap: 1rem;
  grid-auto-flow: column;

  & > div {
    margin: 0;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1080px) {
    grid-auto-flow: row;
  }
`;
