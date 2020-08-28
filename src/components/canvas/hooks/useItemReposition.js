// Libraries
import { useCallback, useReducer, useRef, useEffect } from "react";

// Constants
import { ACTIONS } from "../../../constants";

const REPOSITION_ACTIONS = {
  START_REPOSITION: "START_REPOSITION",
  END_REPOSITION: "END_REPOSITION",
  CHANGE_POSITON: "CHANGE_POSITON"
};

const repositionReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case REPOSITION_ACTIONS.START_REPOSITION: {
      const { startX, startY, top = 0, left = 0 } = payload;

      return {
        ...state,
        isDragging: true,
        startX,
        startY,
        top,
        left
      };
    }

    case REPOSITION_ACTIONS.CHANGE_POSITON: {
      const { clientX, clientY } = payload;
      const { startX, startY } = state;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      return {
        ...state,
        deltaX,
        deltaY
      };
    }

    case REPOSITION_ACTIONS.END_REPOSITION: {
      const { deltaX, deltaY, top, left } = state;
      return {
        ...state,
        isDragging: false,
        top: top + deltaY,
        left: left + deltaX,
        deltaX: 0,
        deltaY: 0
      };
    }

    default:
      return state;
  }
};

const useItemReposition = ({ item, onAction }) => {
  const [state, dispatch] = useReducer(repositionReducer, {
    isDragging: false
  });
  const prevIsDragging = useRef(false);
  const { isDragging } = state;

  const onMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      dispatch({
        type: REPOSITION_ACTIONS.START_REPOSITION,
        payload: {
          startX: event.clientX,
          startY: event.clientY,
          left: item.left,
          top: item.top
        }
      });
    },
    [item]
  );

  useEffect(() => {
    const onMouseMove = (event) => {
      dispatch({
        type: REPOSITION_ACTIONS.CHANGE_POSITON,
        payload: { clientX: event.clientX, clientY: event.clientY }
      });
    };

    const onMouseUp = (event) => {
      dispatch({ type: REPOSITION_ACTIONS.END_REPOSITION });
    };

    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      if (isDragging) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [isDragging]);

  useEffect(() => {
    if (state.isDragging === false && prevIsDragging.current === true) {
      onAction({
        type: ACTIONS.UPDATE_ITEM,
        payload: {
          top: state.top,
          left: state.left,
          id: item.id
        }
      });
    }
    prevIsDragging.current = state.isDragging;
  }, [state, item, onAction]);

  return { onMouseDown, state };
};

export default useItemReposition;
