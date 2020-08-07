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
        style={{ width: "inherit", height: "inherit" }}
      ></div>
      {children}
    </div>
  );
};
