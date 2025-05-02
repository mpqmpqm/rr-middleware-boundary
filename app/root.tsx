import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import type { Route } from './+types/root';
import './app.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Fragment>
      <nav className="flex gap-2 border-b px-4 py-2">
        <NavLink
          className={({ isActive }) => (isActive ? 'underline' : '')}
          to="/"
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'underline' : '')}
          to="/account"
          end
        >
          Account
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'underline' : '')}
          to="/account/project"
          end
        >
          Project
        </NavLink>
      </nav>
      <div className="m-2 mx-4">
        <Outlet />
      </div>
    </Fragment>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Error Boundary: root.tsx';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="m-2">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && <pre className="w-full overflow-x-auto">{stack}</pre>}
    </main>
  );
}
