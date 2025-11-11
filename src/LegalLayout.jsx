import { Link } from "react-router-dom";

export default function LegalLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top bar with logo */}
      <header className="border-b bg-white">
        <div className="mx-auto flex items-center gap-4 px-4 py-3 max-w-6xl">
          <Link to="/" aria-label="Go to homepage" className="flex items-center">
            <img
              src={"/SingFit%20New%20Brand%20Logo.png"} // File in /public folder
              alt="SingFit"
              className="h-8 w-auto"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-3xl px-4 py-10">
        {title ? (
          <h1 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h1>
        ) : null}
        <article className="prose max-w-none">
          {children}
        </article>
      </main>
    </div>
  );
}
