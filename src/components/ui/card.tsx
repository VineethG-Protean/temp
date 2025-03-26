import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`ptn-rounded-2xl ptn-p-4 ptn-bg-nps_accent_1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
