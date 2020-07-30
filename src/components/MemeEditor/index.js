import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import domeToImage from "dom-to-image";

import styles from "./index.module.css";

import TextOutOfImage from "./textOutImage";
import TextInImage from "./textInImage";

export default () => {
  const { memeType } = useParams();
  // textInOfImage or textOutOfImage
  if (memeType === "textInOfImage") {
    return <TextInImage></TextInImage>;
  } else if (memeType === "textOutOfImage") {
    return <TextOutOfImage></TextOutOfImage>;
  }

  return "";
};
