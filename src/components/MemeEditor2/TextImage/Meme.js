import React, { useState, useRef, useEffect } from "react";

export default React.forwardRef(
  ({ styles, textStyles, onClick, image, setTextStyles }, ref) => {
    const focus = useFocusRefOnParamChange(textStyles);

    return (
      <div className="testName" ref={ref}>
        <div
          style={{
            backgroundImage: "url(" + image.src + ")",
            height: image.height + "px",
            width: image.width + "px",
            zIndex: "1",
            position: "relative",
          }}
        >
          <div
            onClick={(e) => {
              onClick(e);
            }}
            style={{ width: "inherit", height: "inherit" }}
          ></div>
          {textStyles.map((element, i) => (
            <MemeText
              key={i}
              style={element.style}
              text={element.text}
              setText={(value) => {
                const arr = textStyles.map((v) => ({ ...v, focus: false }));
                arr[i] = { ...textStyles[i], text: value };
                arr[i].focus = true;
                setTextStyles([...arr]);
              }}
              ref={element.focus ? focus : null}
            />
          ))}
        </div>
      </div>
    );
  }
);

const useFocusRefOnParamChange = (style) => {
  const lastInput = useRef();

  useEffect(() => {
    if (lastInput.current) lastInput.current.focus();
  }, [style]);
  return lastInput;
};

const isLastElement = (array, index) => index === array.length - 1;

/*Forward ref makes it possible to forward the ref to the component*/
const MemeText = React.forwardRef(({ style, text, setText }, ref) => {
  return (
    <input
      type="text"
      onChange={(e) => {
        e.target.style.width = e.target.value.length + 1 + "ch";
        setText(e.target.value);
      }}
      value={text}
      style={style}
      ref={ref}
    />
  );
});
