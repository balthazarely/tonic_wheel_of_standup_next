export const calculateSpinnerDistance = (
  currentSelection: string | undefined,
  newPersonSelected: string,
  rotations: number,
  staticNameArray: any[]
) => {
  let currentNamePosition = staticNameArray.indexOf(currentSelection);
  let selectedNamePosition = staticNameArray.indexOf(newPersonSelected);
  let distanceToTravel = currentNamePosition - selectedNamePosition;
  if (distanceToTravel === 0) {
    return staticNameArray.length * 40 * rotations;
  }
  if (distanceToTravel < 0) {
    return Math.abs(
      (distanceToTravel + staticNameArray.length) * 40 +
        staticNameArray.length * 40 * rotations
    );
  }
  if (distanceToTravel > 0) {
    return Math.abs(
      distanceToTravel * 40 + staticNameArray.length * 40 * rotations
    );
  }
};

export const calcMultiplier = (arr: any[]) => {
  switch (arr.length) {
    case 2:
      return 5;
      break;
    case 3:
      return 4;
      break;
    case 4:
      return 3;
      break;
    case 5:
      return 3;
      break;
    case 6:
      return 2;
      break;
    case 7:
      return 2;
      break;
    case 8:
      return 2;
      break;
    case 9:
      return 2;
      break;
    default:
      return 1;
  }
};

export const duplicateArr = (arr: any[]) => {
  // let times = calcMultiplier(arr);
  // TODO: toggle this back
  let times = 15;
  return Array(times)
    .fill([...arr])
    .reduce((a, b) => a.concat(b));
};
