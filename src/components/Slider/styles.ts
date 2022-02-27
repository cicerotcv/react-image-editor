import styled from 'styled-components';

export const Label = styled.span`
  font-size: 1rem;
  text-align: right;
  width: 100%;
`;

export const Value = styled(Label)`
  background-color: ${(props) => props.theme.colors.background};
  width: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: stretch;
`;
