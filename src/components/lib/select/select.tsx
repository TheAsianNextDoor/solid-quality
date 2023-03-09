import { FormControl, InputLabel, Select as MuiSelect } from '@suid/material';
import { createSignal } from 'solid-js';

import type { SelectChangeEvent, SelectProps } from '@suid/material/Select';
import type { Component, JSX } from 'solid-js';

export const Select: Component<SelectProps> = (props) => {
  const [value, setValue] = createSignal(props.value);

  const handleChange = (evt: SelectChangeEvent<any>, val: JSX.Element) => {
    props?.onChange?.(evt, val);
    setValue(evt?.target?.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <MuiSelect fullWidth {...props} value={value()} onChange={handleChange} />
    </FormControl>
  );
};
