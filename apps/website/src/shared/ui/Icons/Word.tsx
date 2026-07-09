export const Word = (props: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-brackets-contain"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 4h-4v16h4" />
    <path d="M17 4h4v16h-4" />
    <path d="M8 16h.01" />
    <path d="M12 16h.01" />
    <path d="M16 16h.01" />
  </svg>
);
