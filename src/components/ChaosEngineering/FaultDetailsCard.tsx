import React from "react";

export default function FaultDetailsCard(props) {
  const [heading, ...rest] = props.children;
  return (
    <div style={{ backgroundColor: "red", padding: "2rem" }}>
      {heading}
      {rest}
    </div>
  );
}
