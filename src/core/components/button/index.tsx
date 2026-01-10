import clsx from "clsx";
import type { ButtonProps } from "@/core/types/button.type";

const ButtonComponent = (props: ButtonProps) => {
  const {
    title,
    style = {},
    className = "",
    onClick,
    disabled = false,
  } = props;
  return (
    <button
      style={style}
      className={clsx("base-btn", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;
