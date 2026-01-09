const ERROR_CODE = {
  PB_TAG_1001: "Tag not empty",
};

const MESS_DEFAULT = "Hệ thống đang bận. Vui lòng thử lại sau.";

const formatError = (errorCode: string, message?: string) => {
  if (message) {
    if (message === "SYSTEM_ERROR") {
      return MESS_DEFAULT;
    }
    return message;
  }
  return ERROR_CODE[errorCode as keyof typeof ERROR_CODE] || MESS_DEFAULT;
};

export default formatError;
