import domeToImage from "dom-to-image";

function downloadImg(node, memeName) {
  domeToImage
    .toPng(node)
    .then(function (dataUrl) {
      downloadMeme(dataUrl, memeName);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function downloadMeme(dataUrl, name) {
  var link = document.createElement("a");
  link.download = (name && name + ".jpg") || "meme.jpg";
  link.href = dataUrl;
  link.click();
}

export default downloadImg;
