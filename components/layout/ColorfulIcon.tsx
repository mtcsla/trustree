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
      <div className={"" + className} {...props}>
        <Icon
          icon={icon}
          size={size}
          color={`rgb(${color})`}
          style={{
            padding: size / 2.5,
            borderRadius: size / 2.5,
            background: `rgba(${color}, 0.2)`,
            ...style,
          }}
        />
      </div>
    </>
  );
}
