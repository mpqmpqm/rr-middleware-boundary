import {
  isRouteErrorResponse,
  type unstable_MiddlewareFunction,
} from 'react-router';
import type { Route } from './+types/project';

export const provideProject: unstable_MiddlewareFunction = async () =>
  new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error('Expect Error Boundary: project.tsx')),
      200
    )
  );

export const unstable_middleware = [provideProject];

export const loader = () => null;

export default function Project() {
  return <h1>Project</h1>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Error Boundary: project.tsx';
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
