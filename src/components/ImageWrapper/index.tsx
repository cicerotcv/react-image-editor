import DomToImage from 'dom-to-image';
import { useCallback } from 'react';
import { ChangeEvent, useRef, useState } from 'react';
import { randomString } from '../../helpers';
import { useDebouncerState } from '../../hooks/useDebouncerState';
import { Button } from '../Button';
import { Card, ControllersCard, Stack } from '../Containers';
import { Slider } from '../Slider';
import {
  ButtonGroup,
  ControllersContainer,
  Image,
  ImageContainer,
  ImageInput,
} from './styles';

const DV = {
  CONTRAST: 0,
  BRIGHTNESS: 0,
  BLUR: 0,
  SATURATION: 100,
};

export function ImageWrapper() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [source, setImageSource] = useState<string>('');

  const [contrast, setContrast] = useDebouncerState(DV.CONTRAST, 10);
  const [brightness, setBrightness] = useDebouncerState(DV.BRIGHTNESS, 10);
  const [blur, setBlur] = useDebouncerState(DV.BLUR, 10);
  const [saturation, setSaturation] = useDebouncerState(DV.SATURATION, 10);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files?.length) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      resetValues();
      setImageSource(fileURL);
    }
  }

  function resetValues() {
    setContrast(DV.CONTRAST);
    setBrightness(DV.BRIGHTNESS);
    setBlur(DV.BLUR);
    setSaturation(DV.SATURATION);
  }

  const transferClick = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, []);

  const handleDownload = useCallback(() => {
    if (!imageRef.current) return;
    DomToImage.toPng(imageRef.current).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `image-${randomString()}.png`;
      link.href = dataUrl;
      link.click();
    });
  }, []);

  return (
    <>
      <Card>
        <ImageInput onClick={transferClick}>
          <p>Insert an image</p>
          <input
            type="file"
            onChange={handleFileChange}
            hidden
            ref={inputRef}
          />
        </ImageInput>
      </Card>
      {source && (
        <Stack>
          <ControllersCard>
            <ButtonGroup>
              <Button onClick={handleDownload}>
                <i className="fa fa-download" /> Download Image
              </Button>
              <Button onClick={resetValues}>
                <i className="fa fa-undo" /> Reset Values
              </Button>
            </ButtonGroup>
            <ControllersContainer>
              <Slider
                label="contrast"
                minValue={-100}
                maxValue={100}
                onChange={setContrast}
                value={contrast}
                unity="%"
              />
              <Slider
                label="brightness"
                minValue={-100}
                maxValue={100}
                onChange={setBrightness}
                value={brightness}
                unity="%"
              />
              <Slider
                label="blur"
                onChange={setBlur}
                value={blur}
                unity="px"
                minValue={0}
                maxValue={100}
              />
              <Slider
                label="saturation"
                onChange={setSaturation}
                value={saturation}
                minValue={0}
                unity="%"
                maxValue={200}
              />
            </ControllersContainer>
          </ControllersCard>

          <Card>
            <ImageContainer>
              <Image
                ref={imageRef}
                src={source}
                alt="image-file"
                brightness={brightness}
                contrast={contrast}
                blur={blur}
                saturation={saturation}
              />
            </ImageContainer>
          </Card>
        </Stack>
      )}
    </>
  );
}
