import React, { useContext } from "react";

import { MemeTextsContext } from "../index";

export default ({ image, children }) => {
  const { reduceMemeTexts } = useContext(MemeTextsContext);

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
        style={{ width: "inherit", height: "inherit" }}
        onClick={(event) => {
          reduceMemeTexts({
            type: "addText",
            event: {
              pageX: event.pageX,
              target: event.target,
              pageY: event.pageY,
            },
          });
        }}
      ></div>
      {children}
    </div>
  );
};
