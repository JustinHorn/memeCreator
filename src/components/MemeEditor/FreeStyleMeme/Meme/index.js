import React, { useRef, useEffect, useContext } from "react";

import { MemeTextsContext } from "../index";
import { calcRelativePos } from "../calcPos";

import MemeText from "./MemeText";
import MemeImage from "./MemeImage";

export default React.forwardRef(
  ({ onImageClick, image, getSetText, changeMemeTextPosition }, ref) => {
    const { memeTexts, offset, changeMemeTexts } = useContext(MemeTextsContext);

    const focusedMemeText = useRef();

    const MemeTexts = memeTexts.map((element, i) => (
      <MemeText
        index={i}
        key={i}
        onDrag={(e) =>
          changeMemeTexts({
            type: "changePosition",
            index: i,
            newPos: calcRelativePos(e, offset),
          })
        }
        style={element.style}
        text={element.text}
        ref={element.new ? focusedMemeText : null}
      />
    ));

    useEffect(() => {
      if (focusedMemeText.current) {
        focusedMemeText.current.focus();
      }
    }, [memeTexts]);

    return (
      <div ref={ref}>
        <MemeImage image={image} onClick={onImageClick}>
          {MemeTexts}
        </MemeImage>
      </div>
    );
  }
);

/*Forward ref makes it possible to forward the ref to the component*/
