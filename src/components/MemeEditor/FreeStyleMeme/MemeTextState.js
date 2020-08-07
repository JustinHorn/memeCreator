import { useReducer } from "react";

import calcPos from "./calcPos";

export default () => {
  return useReducer(reducer, []);
};

function reducer(memeTexts, action) {
  switch (action.type) {
    case "addText":
      return addText(memeTexts, action);
    case "setText":
      return setText(memeTexts, action);
    case "removeText":
      return removeText(memeTexts, action);
    case "changeTextStyle":
      return changeTextStyle(memeTexts, action);
    case "changePosition":
      return changePosition(memeTexts, action);
    case "onFocus":
      return onFocus(memeTexts, action);
    default:
      console.log("default");
      break;
  }
}

export const addText = (memeTexts, { event }) => {
  const newMemeText = getNewMemeText(event);
  return [...memeTexts.map((v) => ({ ...v, focus: false })), newMemeText];
};

export const removeText = (memeTexts, { id }) => {
  const index = findIndexById(id, memeTexts);
  return [...memeTexts.slice(0, index), ...memeTexts.slice(index + 1)];
};

const findIndexById = (id, arr) => {
  return (
    [0, ...arr].reduce(
      (total, next, index) => (id === next.id && index) || total
    ) - 1
  );
};

export const setText = (memeTexts, { id, newText }) => {
  const index = findIndexById(id, memeTexts);
  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  arr[index].text = newText;
  arr[index].focus = true;
  return [...arr];
};

export const onFocus = (memeTexts, { id }) => {
  const index = findIndexById(id, memeTexts);
  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  arr[index].new = false;
  arr[index].focus = true;
  return [...arr];
};

export const changeTextStyle = (memeTexts, { id, prop, value }) => {
  const index = findIndexById(id, memeTexts);

  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  if (prop === "fontSize") value = parseInt(value);
  arr[index].style[prop] = value;
  arr[index].focus = true;
  return [...arr];
};

export const changePosition = (memeTexts, { id, newPos }) => {
  const index = findIndexById(id, memeTexts);
  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  arr[index].style.left = newPos.left;
  arr[index].style.top = newPos.top;
  arr[index].focus = true;
  return [...arr];
};

let id = 0;

const getNewMemeText = (e) => {
  const result = calcPos(e);
  const new_MemeText = {
    id: id++,
    text: "text",
    style: {
      display: "block",
      position: "absolute",
      zIndex: "100",
      color: "white",
      cols: "4",
      fontSize: 30,
      resize: "none",
      borderColor: "transparent",
      backgroundColor: "transparent",
      transform: "",
      left: result.left,
      top: result.top,
    },
    new: true,
    focus: true,
  };

  return new_MemeText;
};
