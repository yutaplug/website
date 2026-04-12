import React from "react";

type Props = {
  name: string;
  size?: number;
  className?: string;
};

const Icon = ({ children, size = 24, className = "" }: { children: React.ReactNode; size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
    focusable={false}
  >
    {children}
  </svg>
);

const ICONS: Record<string, (size?: number, className?: string) => JSX.Element> = {
  home: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></Icon>
  ),
  menu: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></Icon>
  ),
  search: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></Icon>
  ),
  extension: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" /></Icon>
  ),
  palette: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></Icon>
  ),
  help: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" /></Icon>
  ),
  book: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" /></Icon>
  ),
  info: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></Icon>
  ),
  warning: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></Icon>
  ),
  download: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></Icon>
  ),
  security: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></Icon>
  ),
  phone_android: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" /></Icon>
  ),
  code: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" /></Icon>
  ),
  update: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z" /></Icon>
  ),
  x: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" /></Icon>
  ),
  chevron_left: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></Icon>
  ),
  chevron_right: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" /></Icon>
  ),
  check: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M9 16.2l-3.5-3.5 1.41-1.41L9 13.38l7.09-7.09 1.41 1.41z" /></Icon>
  ),
  content_copy: (size = 24, className = "") => (
    <Icon size={size} className={className}><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z" /></Icon>
  ),
};

const MaterialIcon: React.FC<Props> = ({ name, size = 24, className = "" }) => {
  const key = name || "";
  const renderer = ICONS[key];
  if (renderer) return renderer(size, className);
  return (
    <Icon size={size} className={className}><rect width="24" height="24" fill="transparent" /></Icon>
  );
};

export default MaterialIcon;
