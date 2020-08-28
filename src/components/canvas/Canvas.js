import React from "react";

// BaseUI components
import { Block } from "baseui/block";

import Item from "./Item";

export default function Canvas({ items, onAction }) {
  return (
    <Block height="100%" width="100%">
      {items.map((item) => (
        <Item key={item.id} item={item} onAction={onAction} />
      ))}
    </Block>
  );
}
