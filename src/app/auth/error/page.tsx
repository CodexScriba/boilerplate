export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-4">
          There was an error processing your authentication request.
        </p>
        <a
          href="/auth/login"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Return to login
        </a>
      </div>
    </div>
  )
}
