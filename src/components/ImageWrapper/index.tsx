import { ChangeEvent, useRef, useState } from 'react';
import {
  blobToClipboard,
  getDownloadableBlob,
  randomString,
  readFile,
} from '../../helpers';
import { useDebouncerState } from '../../hooks/useDebouncerState';
import { useLoading } from '../../hooks/useLoading';
import { LoadingButton } from '../Button';
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
  const [loading, setLoading] = useLoading({
    clipboard: false,
    download: false,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const [file] = files;
      const fileURL = await readFile(file);
      resetValues();
      setImageSource(fileURL);
    }
  };

  const resetValues = () => {
    setContrast(DV.CONTRAST);
    setBrightness(DV.BRIGHTNESS);
    setBlur(DV.BLUR);
    setSaturation(DV.SATURATION);
  };

  const transferClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleDownload = async () => {
    setLoading('download', true);
    const blob = await getDownloadableBlob(imageRef.current);
    if (!blob) return;

    const filename = `image-${randomString()}.png`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    setLoading('download', false);
  };

  const writeClipboard = async () => {
    setLoading('clipboard', true);
    const imageBlob = await getDownloadableBlob(imageRef.current);
    if (!imageBlob) return;

    await blobToClipboard(imageBlob);
    setLoading('clipboard', false);
  };

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
              <LoadingButton
                onClick={handleDownload}
                icon="fa fa-download"
                isLoading={loading.download}>
                Download Image
              </LoadingButton>
              <LoadingButton onClick={resetValues} icon="fa fa-undo">
                Reset Values
              </LoadingButton>
              <LoadingButton
                onClick={writeClipboard}
                icon="fas fa-copy"
                isLoading={loading.clipboard}>
                Copy to Clipboard
              </LoadingButton>
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
