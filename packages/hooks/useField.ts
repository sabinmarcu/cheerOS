import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useDebugValue,
  ChangeEvent,
} from 'react';

export type ValidatorType = (value: string) => string | void;
export type FieldDefinitionType = {
  validators: ValidatorType | ValidatorType[];
  defaultValue?: string;
}
export type HandlerType = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type FieldType = {
  isValid: boolean;
  isDirty: boolean;
  value: string;
  errors: string[];
  handler: HandlerType;
  reset: () => void;
}

export const useField = ({
  validators,
  defaultValue = '',
}: FieldDefinitionType): FieldType => {
  const validate = useCallback(
    (val: string): string[] | void => {
      if (Array.isArray(validators)) {
        const errors = validators
          .map((validator) => validator(val))
          .filter(Boolean);
        if (errors.length > 0) {
          return (errors as string[]);
        }
      } else {
        const error = (validators as ValidatorType)(val);
        return error ? [error] : undefined;
      }
      return undefined;
    },
    [validators],
  );

  const [value, setValue] = useState<string>(defaultValue || '');
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(
    () => {
      if (value !== defaultValue && !isDirty) {
        setIsDirty(true);
      }
    },
    [isDirty, setIsDirty, value],
  );

  const handler: HandlerType = useCallback(
    ({ currentTarget: { value: val } }) => {
      setValue(val);
    },
    [setValue],
  );

  const errors: string[] = useMemo(
    () => validate(value) || [],
    [validate, value],
  );

  const isValid = useMemo(
    () => errors.length === 0,
    [errors],
  );

  const reset = useCallback(
    () => {
      setValue('');
      setIsDirty(false);
    },
    [setValue, setIsDirty],
  );

  useDebugValue([
    value,
    isValid ? 'Valid' : 'Invalid',
    ['(', errors.length, ')'].join(''),
  ].join(' '));

  return {
    handler,
    value,
    isDirty,
    isValid,
    errors,
    reset,
  };
};

export default useField;
