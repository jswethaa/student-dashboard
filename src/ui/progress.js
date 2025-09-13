import React from 'react';

const Progress = React.forwardRef(({ className = '', value = 0, max = 100, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    {...props}
  >
    <div
      className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
));
Progress.displayName = "Progress";

export { Progress };
