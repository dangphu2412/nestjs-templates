import {
  createContext,
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useContext
} from 'react';

enum DisclosureStates {
  Open,
  Closed
}

type StateDefinition = {
  disclosureState: DisclosureStates;

  linkedPanel: boolean;

  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  panelRef: MutableRefObject<HTMLDivElement | null>;

  buttonId: string | null;
  panelId: string | null;
};

enum ActionTypes {
  ToggleDisclosure,
  CloseDisclosure,

  SetButtonId,
  SetPanelId,

  LinkPanel,
  UnlinkPanel
}

type Actions =
  | { type: ActionTypes.ToggleDisclosure }
  | { type: ActionTypes.CloseDisclosure }
  | { type: ActionTypes.SetButtonId; buttonId: string | null }
  | { type: ActionTypes.SetPanelId; panelId: string | null }
  | { type: ActionTypes.LinkPanel }
  | { type: ActionTypes.UnlinkPanel };

let reducers: {
  [P in ActionTypes]: (
    state: StateDefinition,
    action: Extract<Actions, { type: P }>
  ) => StateDefinition;
} = {
  [ActionTypes.ToggleDisclosure]: state => ({
    ...state,
    disclosureState: {
      [DisclosureStates.Open]: DisclosureStates.Closed,
      [DisclosureStates.Closed]: DisclosureStates.Open
    }[state.disclosureState]
  }),
  [ActionTypes.CloseDisclosure]: state => {
    if (state.disclosureState === DisclosureStates.Closed) return state;
    return { ...state, disclosureState: DisclosureStates.Closed };
  },
  [ActionTypes.LinkPanel](state) {
    if (state.linkedPanel === true) return state;
    return { ...state, linkedPanel: true };
  },
  [ActionTypes.UnlinkPanel](state) {
    if (state.linkedPanel === false) return state;
    return { ...state, linkedPanel: false };
  },
  [ActionTypes.SetButtonId](state, action) {
    if (state.buttonId === action.buttonId) return state;
    return { ...state, buttonId: action.buttonId };
  },
  [ActionTypes.SetPanelId](state, action) {
    if (state.panelId === action.panelId) return state;
    return { ...state, panelId: action.panelId };
  }
};
const DisclosureContext = createContext<
  [StateDefinition, Dispatch<Actions>] | null
>(null);
DisclosureContext.displayName = 'DisclosureContext';

function useDisclosureContext(component: string) {
  let context = useContext(DisclosureContext);
  if (context === null) {
    let err = new Error(
      `<${component} /> is missing a parent <Disclosure /> component.`
    );
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useDisclosureContext);
    throw err;
  }
  return context;
}

let DisclosureAPIContext = createContext<{
  close(
    focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>
  ): void;
} | null>(null);
DisclosureAPIContext.displayName = 'DisclosureAPIContext';

type Props = {};

const DisclosureFn: ForwardRefRenderFunction<'div', Props> = (props, ref) => {
  return <></>;
};

export const Disclosure = forwardRef(DisclosureFn);
Disclosure.displayName = 'Disclosure';
