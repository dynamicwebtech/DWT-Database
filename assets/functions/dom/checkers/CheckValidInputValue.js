/**
 *
 *  This is used to check if a value is valid (not empty, null or undefined)
 *
 */

export default function CheckValidInputValue(type, input) {
  if (type === "text") {
    const IV = input.value;

    if (IV !== "" && IV !== null && IV !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  if (type === "select") {
    const SI = input.selectedIndex;

    if (SI !== 0) {
      return true;
    } else {
      return false;
    }
  }
}
