import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieControlButton = ({ buttonState, handleClick }) => {
  return (
    <button
      className="ctrl-btn"
      onClick={(e) => handleClick(e)}
      title={
        buttonState.clicked
          ? buttonState.title.active
          : buttonState.title.default
      }
      id={buttonState.name}
    >
      <FontAwesomeIcon
        icon={
          buttonState.clicked
            ? buttonState.icons.active
            : buttonState.icons.default
        }
      />
    </button>
  );
};

export default MovieControlButton;
