import { Slider as MUISlider } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { Button } from '../Button';
import { ControlsWrapper, Label, Value } from './styles';

type TValue = number | ((value: number) => number);

interface ISliderProps {
  label: string;
  value: number;
  minValue: number;
  maxValue: number;
  onChange(value: TValue): void;
  unity?: string;
}

export function Slider(props: ISliderProps) {
  function handleChange(e: ChangeEvent<{}>, value: number | number[]) {
    props.onChange(value as number);
  }

  function increase() {
    props.onChange((value) => Math.min(props.maxValue, value + 1));
  }

  function decrease() {
    props.onChange((value) => Math.max(props.minValue, value - 1));
  }

  return (
    <>
      <Label>{props.label}</Label>
      <MUISlider
        aria-label="Contrast"
        defaultValue={props.value}
        value={props.value}
        min={props.minValue}
        max={props.maxValue}
        step={1}
        color="primary"
        onChange={handleChange}
      />

      <ControlsWrapper>
        <Button onClick={decrease}>
          <i className="fa fa-minus" />
        </Button>
        <Value>
          {props.value} {props.unity && props.unity}
        </Value>
        <Button onClick={increase}>
          <i className="fa fa-plus" />
        </Button>
      </ControlsWrapper>
    </>
  );
}
