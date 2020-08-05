import React, { useRef, useEffect, useContext } from "react";

import { MemeTextsContext } from "../index";

export default React.forwardRef(
  ({ onImageClick, image, getSetText, changeMemeTextPosition }, ref) => {
    const memeTexts = useContext(MemeTextsContext);
    const focus = useRefToFocus([memeTexts]);

    const MemeTexts = memeTexts.map((element, i) => (
      <MemeText
        key={i}
        onDrag={(e) => changeMemeTextPosition(i, calcPos(e, element.dnd))}
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
  return (
    <input
      draggable="true"
      onDragEnd={onDrag}
      type="text"
      onChange={(e) => {
        e.target.style.width = e.target.value.length - 1 + "ch";
        setText(e.target.value);
      }}
      value={text}
      style={style}
      ref={ref}
    />
  );
});

const calcPos = (e, dnd) => {
  const x = e.pageX - dnd.left;
  const y = e.pageY - dnd.top;
  const left = x + "px";
  const top = y + "px";
  return { left, top };
};
