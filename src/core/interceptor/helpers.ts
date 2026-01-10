export const handleError = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response === "object" &&
    (error as any).response !== null &&
    "data" in (error as any).response &&
    typeof (error as any).response.data === "object" &&
    (error as any).response.data !== null &&
    "message" in (error as any).response.data
  ) {
    const err = (error as any).response.data;
    return err;
  }

  if (error instanceof Error) {
    return error;
  }

  return error;
};

export const removeEmpty = (obj: any): any => {
  if (
    obj === null ||
    typeof obj !== "object" ||
    obj instanceof FormData ||
    obj instanceof Blob
  ) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj;
  }

  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== "") {
      newObj[key] = value;
    }
  });
  return newObj;
};
