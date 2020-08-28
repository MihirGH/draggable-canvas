// Libraries
import React from "react";

// BaseUI components
import { Block } from "baseui/block";

// Hooks
import useItemReposition from "./hooks/useItemReposition";

export default function Item({ item, onAction }) {
  const { onMouseDown, state } = useItemReposition({ item, onAction });

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
              cursor: "all-scroll"
            }
          }
        }
      }}
      onMouseDown={onMouseDown}
    >
      {item.textContent}
    </Block>
  );
}
