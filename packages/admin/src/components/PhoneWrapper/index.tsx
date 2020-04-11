import React, {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';

import devices from 'device-size';

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
} from '@material-ui/core';

const inputId = 'device-select';
const deviceNames = Object.keys(devices);
const defaultDevice = deviceNames[0];
export const PhoneWrapper = forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  ({ children }, ref) => {
    const [device, setDevice] = useState(defaultDevice);
    const onChange = useCallback(
      (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const value = (event.target.value as string);
        if (deviceNames.includes(value)) {
          setDevice(value)
        }
      },
      [setDevice]
    );
    const deviceSize = useMemo(
      () => devices[device],
      [device],
    );
    return (
      <Wrapper>
        <PhonePickerWrapper>
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
        </PhonePickerWrapper>
        <Phone ref={ref} size={deviceSize}>
          {children}
        </Phone>
      </Wrapper>
    )
  }
);

export default PhoneWrapper;
