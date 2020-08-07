import { useEffect, useState } from "react";

export default () => {
  const [image, setImage] = useState({ src: "" });

  const angryImg = "/memeCreator/images/AngrySection.jpeg";

  const resizeImg = (img) => {
    setTimeout(() => {
      const MAX_SIZE = 500;
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
      setTimeout(() => {
        setImage(img);
      }, 0);
    });
  };

  const img = new Image();
  img.src = angryImg;

  useEffect(() => {
    resizeImg(img);
  }, [img]);

  const getImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();

      img.src = e.target.result;
      resizeImg(img);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return [image, getImage, setImage];
};
