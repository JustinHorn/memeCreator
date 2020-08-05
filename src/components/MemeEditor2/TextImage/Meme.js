import React, { useState, useRef, useEffect } from "react";

export default React.forwardRef(
  ({ memeTexts, onClick, image, getSetText }, ref) => {
    const focus = useRefToFocus([memeTexts]);

    const MemeTexts = memeTexts.map((element, i) => (
      <MemeText
        key={i}
        style={element.style}
        text={element.text}
        setText={getSetText(i)}
        ref={element.focus ? focus : null}
      />
    ));

    return (
      <div className="testName" ref={ref}>
        <MemeImage image={image} onClick={onClick}>
          {MemeTexts}
        </MemeImage>
      </div>
    );
  }
);

const MemeImage = ({ image, onClick, children }) => {
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
        onClick={onClick}
        style={{ width: "inherit", height: "inherit" }}
      ></div>
      {children}
    </div>
  );
};

const useRefToFocus = (arr) => {
  const lastInput = useRef();

  useEffect(() => {
    if (lastInput.current) lastInput.current.focus();
  }, arr);
  return lastInput;
};

/*Forward ref makes it possible to forward the ref to the component*/
const MemeText = React.forwardRef(({ style, text, setText }, ref) => {
  return (
    <input
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
