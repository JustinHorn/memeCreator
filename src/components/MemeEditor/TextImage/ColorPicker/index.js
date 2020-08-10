import React, { useState } from "react";
import { ChromePicker } from "react-color";
import styles from "./index.module.css";

const ColorPicker = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  return (
    <div className={styles.bodyContainer}>
      <button
        className={styles.Button}
        onClick={() =>
          setShowColorPicker((showColorPicker) => !showColorPicker)
        }
      >
        {showColorPicker ? "Close" : "Text Color"}
      </button>
      <div
        className={styles.ChromePickerContainer}
        style={!showColorPicker ? { display: "none" } : null}
      >
        <ChromePicker
          color={props.currentColor}
          onChange={(updatedColor) => props.setColor(updatedColor.hex)}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
