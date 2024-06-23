export function extractId(obj: {
  id: string | undefined;
  _id: string | undefined;
}) {
  if (typeof obj === 'string') {
    return obj;
  } else {
    return obj?.id || obj?._id || undefined;
  }
}

export const toPx = (val: string | number) => {
  if (typeof val === 'number') {
    return `${val}px`;
  } else {
    return val;
  }
};

export const validateSpecificFields = async (
  fields: Array<string>,
  validateField: (field: string) => void,
) => {
  const validationResults = await Promise.all(
    fields.map((field: string) => validateField(field)),
  );
  console.log(validationResults);
};

export function isSubstringInArray(
  substring: string,
  stringArray: string | any[],
) {
  const upperCaseSubstring = substring?.toUpperCase();
  for (let i = 0; i < stringArray?.length; i++) {
    const upperCaseString = stringArray[i]?.toUpperCase();
    if (
      upperCaseString?.includes(upperCaseSubstring) ||
      upperCaseSubstring?.includes(upperCaseString)
    ) {
      return true;
    }
  }
  return false;
}

export function isSubstringInArrayStrict(
  substring: string,
  stringArray: string | any[],
) {
  const upperCaseSubstring = substring?.toUpperCase();
  for (let i = 0; i < stringArray?.length; i++) {
    const upperCaseString = stringArray[i]?.toUpperCase();
    if (upperCaseString === upperCaseSubstring) {
      return true;
    }
  }
  return false;
}

export function removeDuplicatesByKey(arr: any[], key = '_id') {
  const uniqueItems = arr.reduce(
    (acc: { [x: string]: any }, current: { [x: string]: string | number }) => {
      acc[current[key]] = current;
      return acc;
    },
    {},
  );

  return Object.values(uniqueItems);
}
