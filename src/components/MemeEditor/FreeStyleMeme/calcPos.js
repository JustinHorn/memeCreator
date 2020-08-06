export default (e) => {
  const relation = getTotalLocation(e.target);
  return calcRelativePos(e, relation);
};

export const calcRelativePos = (e, relation) => {
  const x = e.pageX - relation.totalOffsetLeft;
  const y = e.pageY - relation.totalOffsetTop;
  const left = x + "px";
  const top = y + "px";
  return { left, top };
};

export const getTotalLocation = (node) => {
  let totalOffsetLeft = node.offsetLeft;
  let totalOffsetTop = node.offsetTop;
  while (node.offsetParent) {
    node = node.offsetParent;

    totalOffsetLeft += node.offsetLeft;
    totalOffsetTop += node.offsetTop;
  }
  return { totalOffsetLeft, totalOffsetTop };
};
