import { useState } from "react";

const angryImgSrc = "/memeCreator/images/AngrySection.jpeg";

const angryImg = new Image();
angryImg.src = angryImgSrc;

export default () => {
  const [image, setImage] = useState(angryImg);

  const resizeImg = (img) => {
    setTimeout(() => {
      img = resize(img);
      setTimeout(() => {
        setImage(img);
      }, 0);
    });
  };

  const getImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      resizeImg(img);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return { image, getImage, setImage, resizeImg };
};

export const resize = (img, MAX) => {
  const MAX_SIZE = MAX || Math.min(500, window.innerWidth);

  if (img.height > MAX_SIZE || img.width > MAX_SIZE) {
    const ratio = img.height / img.width;

    if (img.height > img.width) {
      img.height = MAX_SIZE;
      img.width = MAX_SIZE / ratio;
    } else {
      img.width = MAX_SIZE;
      img.height = MAX_SIZE * ratio;
    }
  }

  return img;
};
