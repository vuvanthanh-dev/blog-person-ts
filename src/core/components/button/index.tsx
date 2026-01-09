import clsx from "clsx";

interface ButtonProps {
  title: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

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
      className={clsx("btn", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;
