import React, {
  forwardRef,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';

import devices from 'device-size';
import { useLocalStorage } from '@cheeros/hooks/useLocalStorage';

import {
  Wrapper,
  PhonePickerWrapper,
  Phone,
} from './style';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

import CropPortrait from '@material-ui/icons/CropPortrait';
import CropLandscape from '@material-ui/icons/CropLandscape';

const inputId = 'device-select';
const deviceNames = Object.keys(devices);
const defaultDevice = deviceNames[0];
export const PhoneWrapper = forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  ({ children }, ref) => {
    const [device, setDevice] = useLocalStorage('deviceSize', defaultDevice);
    const onChange = useCallback(
      (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const value = (event.target.value as string);
        if (deviceNames.includes(value)) {
          setDevice(value)
        }
      },
      [setDevice]
    );
    const [flipped, setFlipped] = useLocalStorage<boolean>('deviceFlip', false);
    const flipHandler = useCallback(
      () => setFlipped(f => !f),
      [setFlipped],
    );
    const deviceSize = useMemo(
      () => {
        if (!device) {
          return devices[defaultDevice];
        }
        const size = devices[device]
        if (flipped) {
          return {
            width: size.height,
            height: size.width,
          }
        }
        return size;
      },
      [device, flipped],
    );
    return (
      <Wrapper>
        <PhonePickerWrapper size={deviceSize}>
          <FormControl>
            <InputLabel id={inputId}>Device</InputLabel>
            <Select
              labelId={inputId}
              value={device}
              autoWidth
              onChange={onChange}
            >
              {deviceNames.map(it => (
                <MenuItem key={it} value={it}>{it}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={flipHandler}
            endIcon={!flipped ? <CropPortrait /> : <CropLandscape />}
          >
            Orientation:
          </Button>
        </PhonePickerWrapper>
        <Phone ref={ref} size={deviceSize}>
          {children}
        </Phone>
      </Wrapper>
    )
  }
);

export default PhoneWrapper;
