import React from "react";
import "./tooltip.css";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <span className="tooltip-wrapper">
      <span className="tooltip-label">{children}</span>
      <span className="tooltip-text">{text}</span>
    </span>
  );
}