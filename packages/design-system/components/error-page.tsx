export default function ErrorPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">
          We're sorry, but an unexpected error has occurred. Please try again later or contact
          support if the issue persists.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
