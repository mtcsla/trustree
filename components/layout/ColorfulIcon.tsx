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
          size={size * 1.4}
          style={{
            padding: size / 2.5,
            borderRadius: size / 2.5,

            ...style,
          }}
        />
      </div>
    </>
  );
}
