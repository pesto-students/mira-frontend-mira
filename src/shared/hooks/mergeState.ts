import { useState, useCallback } from 'react';
import { isFunction } from 'lodash';

interface Istate {
  [k: string]: any;
}

type NewState = Istate | ((state: Istate) => Istate);

const useMergeState = <T = Istate>(initialState: T) => {
  const [state, setState] = useState(initialState || {});

  const mergeState = useCallback((newState: NewState) => {
    if (isFunction(newState)) {
      setState((currentState) => ({
        ...currentState,
        ...newState(currentState),
      }));
    } else {
      setState((currentState) => ({ ...currentState, ...newState }));
    }
  }, []);

  return [state, mergeState];
};

export default useMergeState;
