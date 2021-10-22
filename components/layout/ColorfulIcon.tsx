import { Icon } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import React from "react";

interface ColorfulIconProps {
  size: number;
  color: string;
  icon: IconName;
  className?: string;
  style?: React.CSSProperties;
}

export default function ColorfulIcon({
  size,
  icon,
  className,
  color,
  style,
  ...props
}: ColorfulIconProps) {
  return (
    <>
      <div className={"inline-block" + className} {...props}>
        <Icon
          icon={icon}
          size={size}
          className="border bg-black bg-opacity-10 box-border"
          style={{
            padding: size / 3.5,
            borderRadius: size / 4,
            ...style,
          }}
        />
      </div>
    </>
  );
}
