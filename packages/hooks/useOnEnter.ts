import {
  useCallback,
} from 'react';

export type OnEnterHandler = (event: React.KeyboardEvent) => void;
export const useOnEnter = (handler: Function): {
  onKeyUp: OnEnterHandler;
} => {
  const onKeyUp = useCallback(
    ({ key }: React.KeyboardEvent): void => key === 'Enter' && handler(),
    [handler],
  );
  return { onKeyUp };
};

export default useOnEnter;
