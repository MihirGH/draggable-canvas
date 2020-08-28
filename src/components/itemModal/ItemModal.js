// Libraries
import React, { useReducer, useCallback } from "react";

// BaseUI Components
import { Block } from "baseui/block";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";
import { KIND as BUTTON_KIND } from "baseui/button";

// Components
import FontSizePicker from "./FontSizePicker";
import MiniColorPicker from "./MiniColorPicker";

// Constants
import { ACTIONS as MODAL_ACTIONS } from "./constants";
import { ACTIONS } from "../../constants";

const INITIAL_STATE = {
  fontSize: [{ label: 12, value: 12 }],
  textContent: "",
  textColor: "#000000"
};

const itemModalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.UPDATE_FONT_SIZE:
      return { ...state, fontSize: action.payload.fontSize };
    case MODAL_ACTIONS.UPDATE_TEXT_CONTENT:
      return { ...state, textContent: action.payload.textContent };
    case MODAL_ACTIONS.UPDATE_TEXT_COLOR:
      return { ...state, textColor: action.payload.textColor };
    case MODAL_ACTIONS.RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default function ItemModal({ isOpen, onAction }) {
  const [state, dispatch] = useReducer(itemModalReducer, INITIAL_STATE);

  const onTextColorChange = useCallback(({ hex }) => {
    dispatch({
      type: MODAL_ACTIONS.UPDATE_TEXT_COLOR,
      payload: { textColor: hex }
    });
  }, []);

  const onModalClose = useCallback(() => {
    dispatch({ type: MODAL_ACTIONS.RESET_STATE });
    onAction({ type: ACTIONS.CLOSE_ADD_ITEM_MODAL });
  }, [onAction]);

  const onAddItem = useCallback(() => {
    onAction({
      type: ACTIONS.ADD_ITEM,
      payload: {
        item: {
          textContent: state.textContent,
          fontSize: state.fontSize[0].value,
          textColor: state.textColor
        }
      }
    });
    onModalClose();
  }, [state, onAction, onModalClose]);

  return (
    <Modal
      onClose={onModalClose}
      isOpen={isOpen}
      size={SIZE.auto}
      role={ROLE.dialog}
      closeable
      animate
    >
      <ModalHeader>Add Item</ModalHeader>

      <ModalBody>
        <Block
          display="flex"
          flexDirection="column"
          minHeight="200px"
          maxHeight="350px"
          width="500px"
          overrides={{
            Block: {
              style: () => ({
                "box-sizing": "border-box",
                border: "1px solid black"
              })
            }
          }}
        >
          <Block
            display="flex"
            flex=" 0 0 auto"
            padding="8px"
            overrides={{
              Block: {
                style: () => ({
                  "border-bottom": "1px solid black"
                })
              }
            }}
          >
            <FontSizePicker
              value={state.fontSize}
              onChange={({ value }) => {
                dispatch({
                  type: MODAL_ACTIONS.UPDATE_FONT_SIZE,
                  payload: { fontSize: value }
                });
              }}
            />
            <MiniColorPicker
              hexCode={state.textColor}
              onChange={onTextColorChange}
            />
          </Block>
          <Block
            flex="1 1 auto"
            padding="8px"
            display="flex"
            flexDirection="column"
          >
            <Block
              $as="textarea"
              width="100%"
              height="100%"
              flex="1 1 auto"
              overrides={{
                Block: {
                  style: {
                    border: "none",
                    fontSize: `${state.fontSize[0].value}px`,
                    color: `${state.textColor}`,
                    resize: "none",
                    fontFamily: "sans-serif",
                    height: "100%"
                  }
                }
              }}
              value={state.textContent}
              placeholder="This is some content"
              onChange={(event) => {
                dispatch({
                  type: MODAL_ACTIONS.UPDATE_TEXT_CONTENT,
                  payload: { textContent: event.target.value }
                });
              }}
            />
          </Block>
        </Block>
      </ModalBody>

      <ModalFooter>
        <ModalButton kind={BUTTON_KIND.tertiary} onClick={onModalClose}>
          Cancel
        </ModalButton>
        <ModalButton onClick={onAddItem}>Add</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
