// Libraries
import React, { useCallback } from "react";

// BaseUI components
import { Block } from "baseui/block";

// Hooks
import useItemReposition from "./hooks/useItemReposition";

// Constants
import { ACTIONS, MODES } from "../../constants";

export default function Item({ item, onAction, mode }) {
  const { onMouseDown, state } = useItemReposition({ item, onAction });

  const handleMouseDown = useCallback(
    (event) => {
      switch (mode) {
        case MODES.CREATE:
          onMouseDown(event);
          break;
        case MODES.EDIT:
          onAction({
            type: ACTIONS.OPEN_EDIT_ITEM_MODAL,
            payload: { item },
          });
          break;
        case MODES.DELETE:
          onAction({
            type: ACTIONS.REMOVE_ITEM,
            payload: { item },
          });
          break;
        default:
      }
    },
    [item, mode, onAction, onMouseDown]
  );

  return (
    <Block
      position="relative"
      display="inline-block"
      top={`${state.top + state.deltaY}px`}
      left={`${state.left + state.deltaX}px`}
      fontFamily="sans-serif"
      color={item.textColor}
      overrides={{
        Block: {
          style: {
            fontSize: `${item.fontSize}px`,
            fontFamily: "sans-serif",
            whiteSpace: "pre",
            ":hover": {
              cursor: mode === MODES.CREATE ? "all-scroll" : "pointer",
            },
          },
        },
      }}
      onMouseDown={handleMouseDown}
    >
      {item.textContent}
    </Block>
  );
}
