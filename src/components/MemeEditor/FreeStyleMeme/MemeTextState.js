import calcPos from "./calcPos";

export default function reducer(memeTexts, action) {
  debugger;
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

export const removeText = (memeTexts, { index }) => {
  return [...memeTexts.slice(0, index), ...memeTexts.slice(index + 1)];
};
export const addText = (memeTexts, { event }) => {
  const newMemeText = getNewMemeText(event);
  return [...memeTexts.map((v) => ({ ...v, focus: false })), newMemeText];
};

export const setText = (memeTexts, { index, newText }) => {
  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  arr[index].text = newText;
  arr[index].focus = true;
  return [...arr];
};

export const onFocus = (memeTexts, { index }) => {
  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  arr[index].new = false;
  arr[index].focus = true;
  return [...arr];
};

export const changeTextStyle = (memeTexts, { index, prop, value }) => {
  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  if (prop === "fontSize") value = parseInt(value);
  arr[index].style[prop] = value;
  arr[index].focus = true;
  return [...arr];
};

export const changePosition = (memeTexts, { index, newPos }) => {
  const arr = memeTexts.map((v) => ({ ...v, focus: false }));
  arr[index] = JSON.parse(JSON.stringify(arr[index]));
  arr[index].style.left = newPos.left;
  arr[index].style.top = newPos.top;
  arr[index].focus = true;
  return [...arr];
};

const getNewMemeText = (e) => {
  const result = calcPos(e);
  const new_MemeText = {
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
