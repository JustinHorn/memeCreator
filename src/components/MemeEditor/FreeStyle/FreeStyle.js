import React, { useState, useEffect, useContext } from "react";

import useMemeTextsReducer from "./MemeTextState";

import styles from "./index.module.css";

import Meme from "./Meme";

import Options from "./Options";

import { getTotalLocation } from "./calcPos";

import { AuthContext } from "context/Auth";

export const MemeTextsContext = React.createContext([]);

export default React.forwardRef(({ image }, imageNodeRef) => {
  const [memeTexts, reduceMemeTexts] = useMemeTextsReducer();

  const offset = useUpdatedOffset(memeTexts, imageNodeRef);

  useHandleUnAuthorized(memeTexts, reduceMemeTexts);

  const [space, setSpace] = useState({
    top: "0",
    topColor: "white",
    bottom: "0",
    bottomColor: "white",
  });

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.body}>
        <MemeTextsContext.Provider
          value={{
            space,
            setSpace,
            memeTexts: memeTexts,
            reduceMemeTexts,
            offset,
          }}
        >
          <Meme ref={imageNodeRef} image={image} />
          <Options memeImageRef={imageNodeRef} />
        </MemeTextsContext.Provider>
      </div>
      <div></div>
    </div>
  );
});

const useHandleUnAuthorized = (memeTexts, reduceMemeTexts) => {
  const { authorized } = useContext(AuthContext);

  useEffect(() => {
    blockUnAuthorized();
  }, [memeTexts]);

  const blockUnAuthorized = () => {
    if (!authorized && memeTexts.length) {
      reduceMemeTexts({ type: "removeText", id: memeTexts[0].id });
      alert("cant use pro version of meme editor without being logged in");
    }
  };
};

const useUpdatedOffset = (memeTexts, imageNodeRef) => {
  const [offset, setOffSet] = useState({
    totalOffsetLeft: 0,
    totalOffsetTop: 0,
  });

  useEffect(() => {
    recalcOffset();
  }, [memeTexts]);

  const recalcOffset = () => {
    if (imageNodeRef.current) {
      setOffSet(getTotalLocation(imageNodeRef.current));
    }
  };
  return offset;
};
