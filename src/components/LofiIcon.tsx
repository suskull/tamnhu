import React from 'react';

interface Props {
  name: string;
  style?: React.CSSProperties;
  className?: string;
}

export const LofiIcon: React.FC<Props> = ({ name, style, className = '' }) => {
  const commonProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 9 9",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { display: "inline-block", verticalAlign: "middle", ...style },
    className,
  };

  switch (name) {
    case 'play':
      return (
        <svg {...commonProps}>
          <path d="M4 1H3V8H4V7H5V6H6V5H7V4H6V3H5V2H4V1Z" fill="white" />
        </svg>
      );

    case 'pause':
      return (
        <svg {...commonProps}>
          <rect x={2} y={1} width={2} height={7} fill="white" />
          <rect x={5} y={1} width={2} height={7} fill="white" />
        </svg>
      );

    case 'previous':
      return (
        <svg {...commonProps}>
          <path d="M4 1H5V3H6V2H7V1H8V8H7V7H6V6H5V8H4V7H3V6H2V5H1V4H2V3H3V2H4V1Z" fill="white" />
        </svg>
      );

    case 'forward':
      return (
        <svg {...commonProps}>
          <path d="M5 1H4V3H3V2H2V1H1V8H2V7H3V6H4V8H5V7H6V6H7V5H8V4H7V3H6V2H5V1Z" fill="white" />
        </svg>
      );

    case 'shuffle':
      return (
        <svg {...commonProps}>
          <path d="M7 1H6V3H4V5H2V6H1V7H3V6H5V4H7V3H8V2H7V1Z" fill="white" />
          <path d="M3 2H1V3H2V4H3V2Z" fill="white" />
          <path d="M8 6H7V5H6V8H7V7H8V6Z" fill="white" />
        </svg>
      );

    case 'timer':
      return (
        <svg {...commonProps}>
          <path d="M4 3H5V4H6V5H4V3Z" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 1H3V2H2V3H1V6H2V7H3V8H6V7H7V6H8V3H7V2H6V1ZM6 2V3H7V6H6V7H3V6H2V3H3V2H6Z"
            fill="white"
          />
        </svg>
      );

    case 'heart':
      return (
        <svg {...commonProps}>
          <path d="M3 1H2V2H1V5H2V6H3V7H4V8H5V7H6V6H7V5H8V2H7V1H6V2H5V3H4V2H3V1Z" fill="white" />
        </svg>
      );

    case 'fullscreenEnter':
      return (
        <svg {...commonProps}>
          <path d="M5 1V2H6V3H5V4H6V3H7V4H8V1H5Z" fill="white" />
          <path d="M4 8V7H3V6H4V5H3V6H2L2 5H1L1 8L4 8Z" fill="white" />
        </svg>
      );

    case 'fullscreenExit':
      return (
        <svg {...commonProps}>
          <path d="M5 4H8V3H7V2H8V1L7 1V2L6 2L6 1L5 1L5 4Z" fill="white" />
          <path d="M4 5L4 8H3L3 7H2V6H1L1 5L4 5Z" fill="white" />
          <path d="M2 7V8H1L1 7H2Z" fill="white" />
        </svg>
      );

    case 'beats1':
      return (
        <svg {...commonProps}>
          <rect x={1} y={5} width={1} height={3} fill="white" />
          <rect x={3} y={1} width={1} height={7} fill="white" />
          <rect x={5} y={6} width={1} height={2} fill="white" />
          <rect x={7} y={3} width={1} height={5} fill="white" />
        </svg>
      );

    case 'beats2':
      return (
        <svg {...commonProps}>
          <rect x={1} y={5} width={1} height={3} fill="white" />
          <rect x={3} y={3} width={1} height={5} fill="white" />
          <rect x={5} y={1} width={1} height={7} fill="white" />
          <rect x={7} y={5} width={1} height={3} fill="white" />
        </svg>
      );

    case 'beats3':
      return (
        <svg {...commonProps}>
          <rect x={1} y={3} width={1} height={5} fill="white" />
          <rect x={3} y={6} width={1} height={2} fill="white" />
          <rect x={5} y={2} width={1} height={6} fill="white" />
          <rect x={7} y={4} width={1} height={4} fill="white" />
        </svg>
      );

    case 'beats4':
      return (
        <svg {...commonProps}>
          <rect x={1} y={2} width={1} height={6} fill="white" />
          <rect x={3} y={5} width={1} height={3} fill="white" />
          <rect x={5} y={3} width={1} height={5} fill="white" />
          <rect x={7} y={6} width={1} height={2} fill="white" />
        </svg>
      );

    case 'beatsMute':
      return (
        <svg {...commonProps}>
          <rect x={1} y={7} width={1} height={1} fill="white" />
          <rect x={3} y={7} width={1} height={1} fill="white" />
          <rect x={5} y={7} width={1} height={1} fill="white" />
          <rect x={7} y={7} width={1} height={1} fill="white" />
        </svg>
      );

    case 'rewind15':
      return (
        <svg {...commonProps}>
          <path d="M4 1H5V3H6V2H7V1H8V8H7V7H6V6H5V8H4V7H3V6H2V5H1V4H2V3H3V2H4V1Z" fill="white" />
          <rect x={0} y={1} width={1} height={7} fill="white" />
        </svg>
      );

    case 'forward30':
      return (
        <svg {...commonProps}>
          <path d="M5 1H4V3H3V2H2V1H1V8H2V7H3V6H4V8H5V7H6V6H7V5H8V4H7V3H6V2H5V1Z" fill="white" />
          <rect x={8} y={1} width={1} height={7} fill="white" />
        </svg>
      );

    case 'mixer':
      return (
        <svg {...commonProps}>
          <rect x={1} y={1} width={1} height={7} fill="white" />
          <rect x={4} y={1} width={1} height={7} fill="white" />
          <rect x={7} y={1} width={1} height={7} fill="white" />
          <rect x={0} y={3} width={3} height={2} fill="white" />
          <rect x={3} y={5} width={3} height={2} fill="white" />
          <rect x={6} y={2} width={3} height={2} fill="white" />
        </svg>
      );

    case 'book':
      return (
        <svg {...commonProps}>
          <path d="M1 2H4V8H1V2Z" fill="white" />
          <path d="M5 2H8V8H5V2Z" fill="white" />
          <rect x={4} y={1} width={1} height={8} fill="white" />
        </svg>
      );

    default:
      return null;
  }
};
