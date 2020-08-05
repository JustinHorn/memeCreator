import domeToImage from "dom-to-image";

function downloadImg(node) {
  domeToImage
    .toPng(node)
    .then(function (dataUrl) {
      downloadMeme(dataUrl);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function downloadMeme(dataUrl) {
  var link = document.createElement("a");
  link.download = "meme.jpg";
  link.href = dataUrl;
  link.click();
}

export default downloadImg;
