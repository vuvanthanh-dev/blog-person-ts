import React from "react";
import clsx from "clsx";

interface TitlePageProps {
  title: string;
  className?: string;
}

const TitlePageComponent: React.FC<TitlePageProps> = (props) => {
  const { title, className } = props;
  return (
    <div className={clsx("base-background mb-10 base-title", className)}>
      {title}
    </div>
  );
};

export default TitlePageComponent;
