import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className: string;
  [key: string]: any;
}

function Icon(props: IconProps) {
  const { name, className, ...rest } = props;
  return (
    <svg {...rest} className={`icon ${className}`} aria-hidden="true">
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}

export default Icon;
