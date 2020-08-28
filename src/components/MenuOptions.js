// Libraries
import React, { useCallback } from "react";

// BaseUI components
import { Button, SHAPE, SIZE } from "baseui/button";
import { StatefulMenu } from "baseui/menu";
import { StatefulPopover } from "baseui/popover";

// Icons
import Plus from "baseui/icon/plus";

// Constants
import { ACTIONS } from "../constants";

function MenuOptions({ onAction }) {
  const onItemSelect = useCallback(() => {
    onAction({ type: ACTIONS.OPEN_ADD_ITEM_MODAL });
  }, [onAction]);

  return (
    <StatefulPopover
      content={
        <StatefulMenu
          items={[{ label: "Add Item" }]}
          onItemSelect={onItemSelect}
        />
      }
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
              right: "0px"
            })
          }
        }}
      >
        <Plus size={20} />
      </Button>
    </StatefulPopover>
  );
}

export default MenuOptions;
