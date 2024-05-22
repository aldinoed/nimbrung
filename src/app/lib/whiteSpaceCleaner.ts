export default function whiteSpaceCommentCleaner(comment: String) {
  let arrayComment = comment.split("");
  const commentArrayTraining = arrayComment;
  let i = arrayComment.length - 1;

  function forwardCleaning(data: Array<String>) {
    for (let item of data) {
      if (item === " " || item.includes("\n")) {
        arrayComment.shift();
      } else {
        break;
      }
    }
    console.log(arrayComment);
  }
  function backwardCleaning(data: Array<String>) {
    while (i >= 0) {
      if (data[i] === " " || data[i].includes("\n")) {
        arrayComment.pop();
        i--;
      } else {
        return arrayComment.join("");
      }
    }
  }
  forwardCleaning(commentArrayTraining);
  backwardCleaning(commentArrayTraining);
  return arrayComment.join("");
}
