export interface ButtonProps {
  title: string;
  type: string;
  action: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
