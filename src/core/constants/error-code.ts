export const ERROR_CODE = {
  PB_TAG_1001: "Tag not empty",

  ERR_SESSION_EXPIRED: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.",
  ERR_FORBIDDEN_ACCESS:
    "Bạn không có quyền truy cập. Vui lòng liên hệ với quản trị viên.",
};

const MESS_DEFAULT = "Hệ thống đang bận. Vui lòng thử lại sau.";

export const formatError = (errorCode: string, message?: string | null) => {
  if (message) {
    if (message === "SYSTEM_ERROR") {
      return MESS_DEFAULT;
    }
    return message;
  }
  return ERROR_CODE[errorCode as keyof typeof ERROR_CODE] || errorCode;
};
