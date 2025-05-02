import {
  isRouteErrorResponse,
  type unstable_MiddlewareFunction,
} from 'react-router';
import type { Route } from './+types/account';

export const provideAccount: unstable_MiddlewareFunction = async () =>
  new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error('Expect Error Boundary: account.tsx')),
      200
    )
  );

export const unstable_middleware = [provideAccount];

export const loader = () => null;

export default function Account() {
  return <h1>Account</h1>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Error Boundary: account.tsx';
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
    </main>
  );
}
