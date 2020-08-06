import React, { useRef, useEffect, useContext } from "react";

import { MemeTextsContext } from "../index";
import { calcRelativePos } from "../calcPos";

export default React.forwardRef(({ style, text, index }, ref) => {
  const { changeMemeTexts, offset } = useContext(MemeTextsContext);

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
    changeMemeTexts({ type: "setText", newText: e.target.value, index });
  };

  const onDrag = (e) => {
    changeMemeTexts({
      type: "changePosition",
      index,
      newPos: calcRelativePos(e, offset),
    });
  };

  return (
    <textarea
      draggable="true"
      onFocus={() => changeMemeTexts({ type: "onFocus", index })}
      onDrag={onDrag}
      onDragEnd={onDrag}
      type="text"
      onChange={onChange}
      value={text}
      style={style}
      ref={ref}
      rows="1"
      cols="4"
    />
  );
});
