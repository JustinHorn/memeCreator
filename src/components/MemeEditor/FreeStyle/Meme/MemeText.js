import React, { useRef, useEffect, useContext } from "react";

import { MemeTextsContext } from "../index";
import { calcRelativePos } from "../calcPos";

export default React.forwardRef(({ element }, ref) => {
  const { reduceMemeTexts, offset } = useContext(MemeTextsContext);
  const { text, style, id } = element;

  const expandWithText = (e) => {
    const max = e.target.value
      .split("\n")
      .map((x) => x.length)
      .reduce((total, num) => Math.max(total, num));
    e.target.style.width = max + 2 + "ch";
  };

  const adjustRows = (e) =>
    (e.target.rows = Math.max(1, e.target.value.split("\n").length));

  const onChange = (e) => {
    adjustRows(e);
    expandWithText(e);
    reduceMemeTexts({ type: "setText", newText: e.target.value, id });
  };

  const onDrag = (e) => {
    reduceMemeTexts({
      type: "changePosition",
      id,
      newPos: calcRelativePos(e, offset),
    });
  };

  const focusedMemeText = useRef();

  useEffect(() => {
    focusedMemeText.current.focus();
  }, []);

  return (
    <textarea
      draggable="true"
      onFocus={() => reduceMemeTexts({ type: "onFocus", id })}
      onDrag={onDrag}
      onDragEnd={onDrag}
      type="text"
      onChange={onChange}
      value={text}
      style={style}
      ref={focusedMemeText}
      rows="1"
      cols="4"
    />
  );
});
