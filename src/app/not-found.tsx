export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-center px-4">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-light dark:text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-muted mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <a
        href="/products"
        className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
}
