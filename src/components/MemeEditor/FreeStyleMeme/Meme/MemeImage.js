import React, { useContext } from "react";

import { MemeTextsContext } from "../index";
import { changeTextStyle } from "../MemeTextState";

export default ({ image, children }) => {
  const { changeMemeTexts } = useContext(MemeTextsContext);

  return (
    <div
      style={{
        backgroundImage: "url(" + image.src + ")",
        height: image.height + "px",
        width: image.width + "px",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div
        onClick={(event) => {
          changeMemeTexts({
            type: "addText",
            event: {
              pageX: event.pageX,
              target: event.target,
              pageY: event.pageY,
            },
          });
        }}
        style={{ width: "inherit", height: "inherit" }}
      ></div>
      {children}
    </div>
  );
};
