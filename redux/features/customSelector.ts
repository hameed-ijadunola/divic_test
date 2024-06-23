import { useSelector } from 'react-redux';

export const useCustomSelector = (sliceName = 'userStore', properties = []) => {
  const selectedSlice = useSelector(state => state[sliceName]);

  if (!selectedSlice) {
    console.error(`Redux slice "${sliceName}" not found.`);
    return {};
  }

  const selectedProperties = selectedSlice;
  properties.forEach(property => {
    if (selectedSlice[property] !== undefined) {
      selectedProperties[property] = selectedSlice[property];
    } else {
      console.error(
        `Property "${property}" not found in the slice "${sliceName}".`,
      );
    }
  });

  return selectedProperties;
};
