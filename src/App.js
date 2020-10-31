import React, { useReducer } from "react";
import { v4 } from "uuid";

import { Block } from "baseui/block";
import { Label3 } from "baseui/typography";

// Components
import Canvas from "./components/canvas/Canvas";
import MenuOptions from "./components/MenuOptions";
import ItemModal from "./components/itemModal/ItemModal";

// Constants
import { ACTIONS, MODES } from "./constants";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_ADD_ITEM_MODAL:
      return {
        ...state,
        isItemModalOpen: true,
        initialItem: {},
        mode: MODES.CREATE,
      };
    case ACTIONS.OPEN_EDIT_ITEM_MODAL:
      return {
        ...state,
        isItemModalOpen: true,
        initialItem: action.payload.item,
      };
    case ACTIONS.CLOSE_ADD_ITEM_MODAL:
      return {
        ...state,
        isItemModalOpen: false,
        initialItem: {},
      };
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: state.items.concat({
          id: v4(),
          ...action.payload.item,
        }),
      };
    case ACTIONS.UPDATE_ITEM: {
      const { id, item: updatedItem } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        ),
      };
    }
    case ACTIONS.REMOVE_ITEM: {
      const { id } = action.payload.item;
      return { ...state, items: state.items.filter((item) => item.id !== id) };
    }
    case ACTIONS.CHANGE_MODE:
      return { ...state, mode: action.payload.mode };
    default:
      return state;
  }
};

const getModeLabel = (mode) => {
  switch (mode) {
    case MODES.CREATE:
      return "create";
    case MODES.EDIT:
      return "edit";
    case MODES.DELETE:
      return "delete";
    default:
      return "view";
  }
};

export default function App() {
  const [state, onAction] = useReducer(reducer, {
    isItemModalOpen: false,
    items: [],
    initialItem: {},
    mode: MODES.CREATE,
  });

  return (
    <Block>
      <Block
        height="calc(100vh - 16px)"
        width="100%"
        padding="8px"
        overrides={{
          Block: {
            style: () => ({
              "box-sizing": "border-box",
              border: "1px solid black",
            }),
          },
        }}
      >
        <Block position="relative" width="100%" height="100%">
          <Canvas items={state.items} onAction={onAction} mode={state.mode} />
          <MenuOptions onAction={onAction} />
          <Block position="absolute" right="0" bottom="0">
            <Label3>{`You're currently in ${getModeLabel(
              state.mode
            )} mode`}</Label3>
          </Block>
        </Block>
      </Block>

      <ItemModal
        isOpen={state.isItemModalOpen}
        initialItem={state.initialItem}
        mode={state.mode}
        onAction={onAction}
        key={state.initialItem.id ?? "CREATE_MODAL"}
      />
    </Block>
  );
}
