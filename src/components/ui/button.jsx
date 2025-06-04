export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-xl font-medium px-4 py-2 transition duration-200 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
