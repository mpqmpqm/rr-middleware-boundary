import { Outlet, type unstable_MiddlewareFunction } from 'react-router';

const requireAuth: unstable_MiddlewareFunction = async () =>
  console.log('Checking auth...');

export const unstable_middleware = [requireAuth];

export const loader = () => null;

export default Outlet;
