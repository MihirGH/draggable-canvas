import React, { useReducer } from "react";
import { v4 } from "uuid";

import { Block } from "baseui/block";

// Components
import Canvas from "./components/canvas/Canvas";
import MenuOptions from "./components/MenuOptions";
import ItemModal from "./components/itemModal/ItemModal";

// Constants
import { ACTIONS } from "./constants";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_ADD_ITEM_MODAL:
      return { ...state, isItemModalOpen: true };
    case ACTIONS.CLOSE_ADD_ITEM_MODAL:
      return { ...state, isItemModalOpen: false };
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: state.items.concat({
          id: v4(),
          ...action.payload.item
        })
      };
    case ACTIONS.UPDATE_ITEM: {
      const { id, ...stateToUpdate } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, ...stateToUpdate } : item
        )
      };
    }
    default:
      return state;
  }
};

export default function App() {
  const [state, onAction] = useReducer(reducer, {
    isItemModalOpen: false,
    items: []
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
              border: "1px solid black"
            })
          }
        }}
      >
        <Block position="relative" width="100%" height="100%">
          <Canvas items={state.items} onAction={onAction} />
          <MenuOptions onAction={onAction} />
        </Block>
      </Block>

      <ItemModal isOpen={state.isItemModalOpen} onAction={onAction} />
    </Block>
  );
}
