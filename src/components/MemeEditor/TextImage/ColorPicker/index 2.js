import React, { useState } from "react";
import { ChromePicker } from "react-color";
import styles from "./index.module.css";

const ColorPicker = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  return (
    <div>
      <button
        className={styles.Button}
        onClick={() =>
          setShowColorPicker((showColorPicker) => !showColorPicker)
        }
      >
        {showColorPicker ? "Close" : "Text Color"}
      </button>
      {showColorPicker && (
        <ChromePicker
          color={props.currentColor}
          onChange={(updatedColor) => props.setColor(updatedColor.hex)}
        />
      )}
    </div>
  );
};

export default ColorPicker;
