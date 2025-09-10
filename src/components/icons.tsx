import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h7c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-7c-.6 0-1-.4-1-1v-10c0-.6.4-1 1-1Z" />
      <path d="M6 18V6" />
      <path d="M15 18V9" />
    </svg>
  ),
};
