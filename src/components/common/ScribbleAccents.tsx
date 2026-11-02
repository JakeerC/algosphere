import React from 'react';

/**
 * Hand-drawn Vector Scribble Accents inspired by ScribbleKit
 * Infinitely scalable SVG geometry with organic curves & playful charm.
 */

// 1. Hand-Drawn Fluid Wave Swoosh Underline
export const ScribbleUnderline: React.FC<{
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
}> = ({
  color = 'var(--primary-500)',
  className = '',
  style,
  width = '100%',
  height = 14
}) => (
  <svg
    viewBox="0 0 240 24"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{
      display: 'block',
      overflow: 'visible',
      ...style
    }}
  >
    <path
      d="M3 14C35 7.5 78 6 120 12C155 17 195 18 237 8"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.85 }}
    />
    <path
      d="M12 19C48 13 88 12.5 130 18C162 22 198 22 230 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.6 }}
    />
  </svg>
);

// 2. Playful Hand-Drawn Oval Loop / Circle
export const ScribbleLoop: React.FC<{
  color?: string;
  children: React.ReactNode;
  className?: string;
}> = ({
  color = 'var(--primary-500)',
  children,
  className = ''
}) => (
  <span style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }} className={className}>
    {children}
    <svg
      viewBox="0 0 160 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: '-15%',
        left: '-12%',
        width: '124%',
        height: '130%',
        pointerEvents: 'none',
        overflow: 'visible'
      }}
    >
      <path
        d="M18 36C12 24 24 10 55 6C100 0.5 142 8 152 24C162 42 136 56 90 60C46 64 8 52 4 34C0.5 18 28 6 68 8C108 10 146 22 148 38"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.8 }}
      />
    </svg>
  </span>
);

// 3. Tapered Hand-Drawn 4-Point Starburst Sparkle
export const ScribbleSparkle: React.FC<{
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  color = 'var(--state-inspect)',
  size = 24,
  className = '',
  style
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <path
      d="M16 2C16 10 22 16 30 16C22 16 16 22 16 30C16 22 10 16 2 16C10 16 16 10 16 2Z"
      fill={color}
    />
    <circle cx="27" cy="6" r="2" fill={color} style={{ opacity: 0.8 }} />
    <circle cx="5" cy="26" r="1.5" fill={color} style={{ opacity: 0.6 }} />
  </svg>
);

// 4. Hand-Drawn Sketch Arrow
export const ScribbleArrow: React.FC<{
  color?: string;
  width?: number;
  height?: number;
  flipX?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  color = 'var(--primary-500)',
  width = 48,
  height = 36,
  flipX = false,
  className = '',
  style
}) => (
  <svg
    viewBox="0 0 54 38"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{
      display: 'inline-block',
      transform: flipX ? 'scaleX(-1)' : 'none',
      ...style
    }}
  >
    <path
      d="M4 28C16 30 32 26 44 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 10C39 10 44 11 48 11C47 16 46 22 44 26"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 5. Retro Starburst Sticker Badge
export const ScribbleBadgeSticker: React.FC<{
  text: string;
  color?: string;
  textColor?: string;
  size?: number;
  rotation?: number;
}> = ({
  text,
  color = 'var(--state-swap)',
  textColor = '#ffffff',
  size = 56,
  rotation = -8
}) => (
  <div
    style={{
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `rotate(${rotation}deg)`,
      userSelect: 'none',
      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))'
    }}
  >
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ position: 'absolute', inset: 0 }}
    >
      <path
        d="M32 0L38 12L52 8L49 22L63 26L52 36L61 48L47 48L47 62L34 54L26 64L20 51L6 55L11 41L0 34L11 25L4 12L18 14L20 0L32 0Z"
        fill={color}
      />
    </svg>
    <span
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'var(--font-display)',
        fontSize: '11px',
        fontWeight: 'var(--font-bold)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: textColor
      }}
    >
      {text}
    </span>
  </div>
);

// 6. Soft Organic Blob Accent for Backgrounds
export const ScribbleBlob: React.FC<{
  color?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({
  color = 'var(--primary-surface)',
  width = 320,
  height = 320,
  opacity = 0.5,
  style
}) => (
  <div
    style={{
      position: 'absolute',
      width,
      height,
      borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
      backgroundColor: color,
      filter: 'blur(50px)',
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
      ...style
    }}
  />
);
