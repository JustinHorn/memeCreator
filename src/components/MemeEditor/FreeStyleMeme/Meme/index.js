import React, { useRef, useEffect, useContext } from "react";

import { MemeTextsContext } from "../index";
import { calcRelativePos } from "../calcPos";

export default React.forwardRef(
  ({ onImageClick, image, getSetText, changeMemeTextPosition }, ref) => {
    const { memeTexts, offset } = useContext(MemeTextsContext);
    const focus = useRefToFocus([memeTexts]);

    const MemeTexts = memeTexts.map((element, i) => (
      <MemeText
        key={i}
        onDrag={(e) => changeMemeTextPosition(i, calcRelativePos(e, offset))}
        style={element.style}
        text={element.text}
        setText={getSetText(i)}
        changeMemeTextPosition={changeMemeTextPosition}
        ref={element.focus ? focus : null}
      />
    ));

    return (
      <div ref={ref}>
        <MemeImage image={image} onClick={onImageClick}>
          {MemeTexts}
        </MemeImage>
      </div>
    );
  }
);

const MemeImage = ({ image, onClick, children }) => (
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
      onClick={onClick}
      style={{ width: "inherit", height: "inherit" }}
    ></div>
    {children}
  </div>
);

const useRefToFocus = (arr) => {
  const lastInput = useRef();

  useEffect(() => {
    if (lastInput.current) lastInput.current.focus();
  }, arr);
  return lastInput;
};

/*Forward ref makes it possible to forward the ref to the component*/
const MemeText = React.forwardRef(({ onDrag, style, text, setText }, ref) => {
  const expandWithText = (e) => {
    const max = e.target.value
      .split("\n")
      .map((x) => x.length)
      .reduce((total, num) => Math.max(total, num));
    console.log(max);
    e.target.style.width = max + 2 + "ch";
  };

  const adjustRows = (e) =>
    (e.target.rows = Math.max(1, e.target.value.split("\n").length));

  return (
    <textarea
      draggable="true"
      onDrag={onDrag}
      onDragEnd={onDrag}
      type="text"
      onChange={(e) => {
        adjustRows(e);
        expandWithText(e);
        setText(e.target.value);
      }}
      value={text}
      style={style}
      ref={ref}
      rows="1"
      cols="4"
    />
  );
});
