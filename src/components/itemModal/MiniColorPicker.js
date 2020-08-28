import React from "react";
import { TwitterPicker } from "react-color";

// BaseUI components
import { Block } from "baseui/block";
import { StatefulPopover } from "baseui/popover";
import { Button, KIND as BUTTON_KIND } from "baseui/button";

export default function MiniColorPicker({ hexCode, onChange }) {
  return (
    <StatefulPopover
      placement="bottomRight"
      content={
        <TwitterPicker
          triangle="top-right"
          color={hexCode}
          onChange={onChange}
        />
      }
    >
      <Button
        kind={BUTTON_KIND.secondary}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => {
              return {
                height: "48px",
                marginLeft: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              };
            }
          }
        }}
      >
        <Block width="24px" height="24px" backgroundColor={hexCode} />
      </Button>
    </StatefulPopover>
  );
}
