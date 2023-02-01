export const TrashIcon = ({ width = 20, height = 20, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 7h16"></path>
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
      <path d="M10 12l4 4m0 -4l-4 4"></path>
    </svg>
  );
};

export const ExcelIcon = ({ width = 15, height = 15 }) => {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <path
        d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6 4 4m-4 0 4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z"
        stroke="currentColor"
      />
    </svg>
  );
};

export const XIcon = (props)=> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1={18} y1={6} x2={6} y2={18}></line>
    <line x1={6} y1={6} x2={18} y2={18}></line>
  </svg>
  )
} 