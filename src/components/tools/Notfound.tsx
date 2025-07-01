import { createPortal } from "react-dom";

export interface NotFoundProps {
  children?: React.ReactNode;
  condition?: boolean;
}

export const NotFound: React.FC<NotFoundProps> = ({ condition, children }) => {
  if (condition) return <>{children}</>;

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <div className="text-center">
        <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
          <svg
            className="h-8 w-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-medium text-gray-900">Pet not found</h3>
        <p className="mt-2 text-gray-500 max-w-md">
          The pet you are looking for was not found or does not exist.
        </p>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default NotFound;
