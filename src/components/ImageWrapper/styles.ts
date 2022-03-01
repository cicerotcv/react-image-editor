import { shade } from 'polished';
import styled from 'styled-components';
import { makeFilter } from '../../helpers';

export const ImageContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  box-shadow: 0 5px 15px #202020f0;
  overflow: hidden;
  margin: 0 auto;
`;

interface ImageProps {
  contrast: number;
  brightness: number;
  blur: number;
  saturation: number;
}

export const Image = styled.img.attrs((props: ImageProps) => ({
  style: {
    filter: makeFilter({
      blur: props.blur,
      brightness: props.brightness,
      contrast: props.contrast,
      saturation: props.saturation,
    }),
  },
}))<ImageProps>`
  max-height: 80vh;
  max-width: 100%;
  margin: 0;

  @media screen and (min-width: 1080px) {
    max-width: 50vw;
  }
`;

export const ImageInput = styled.div`
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => shade(0.25, props.theme.colors.background)};
  cursor: pointer;

  &:hover > p {
    border-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.background};
  }

  p {
    margin: 0;
    padding: 1rem;

    border: 2px dashed ${(props) => props.theme.colors.text};
    border-radius: 0.5rem;

    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    font-weight: bold;
    font-family: monospace;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};

    transition: 100ms;
  }
`;

export const ControllersContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-items: center;
  align-items: center;
  row-gap: 0.5rem;
  column-gap: 1.5rem;
`;

export const ButtonGroup = styled.div`
  display: inline-flex;
  gap: 1rem;
`;
