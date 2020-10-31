// Libraries
import React, { useCallback } from "react";

// BaseUI components
import { Button, SHAPE, SIZE } from "baseui/button";
import { StatefulMenu } from "baseui/menu";
import { StatefulPopover } from "baseui/popover";

// Icons
import Plus from "baseui/icon/plus";

// Constants
import { ACTIONS, MODES } from "../constants";

function MenuOptions({ onAction }) {
  const onItemSelect = useCallback(
    (item) => {
      if (item.mode === MODES.CREATE) {
        onAction({ type: ACTIONS.OPEN_ADD_ITEM_MODAL });
      } else {
        onAction({
          type: ACTIONS.CHANGE_MODE,
          payload: { mode: item.mode },
        });
      }
    },
    [onAction]
  );

  return (
    <StatefulPopover
      content={({ close }) => (
        <StatefulMenu
          items={[
            { label: "Add Item", mode: MODES.CREATE },
            { label: "Edit Items", mode: MODES.EDIT },
            { label: "Remove Item", mode: MODES.DELETE },
          ]}
          onItemSelect={({ item }) => {
            onItemSelect(item);
            close();
          }}
        />
      )}
      placement="bottomRight"
    >
      <Button
        shape={SHAPE.round}
        size={SIZE.compact}
        overrides={{
          BaseButton: {
            style: () => ({
              position: "absolute",
              top: "0px",
              right: "0px",
            }),
          },
        }}
      >
        <Plus size={20} />
      </Button>
    </StatefulPopover>
  );
}

export default MenuOptions;
