import React, { useContext } from "react";

import { MemeTextsContext } from "../index";

import MemeText from "./MemeText";
import MemeImage from "./MemeImage";

export default React.forwardRef(({ onImageClick, image }, ref) => {
  const { memeTexts } = useContext(MemeTextsContext);

  const MemeTexts = memeTexts.map((element, i) => (
    <MemeText key={i} element={element} />
  ));

  return (
    <div ref={ref}>
      <MemeImage image={image} onClick={onImageClick}>
        {MemeTexts}
      </MemeImage>
    </div>
  );
});

/*Forward ref makes it possible to forward the ref to the component*/
