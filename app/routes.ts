import {
  type RouteConfig,
  index,
  layout,
  prefix,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('routes/auth.tsx', [
    ...prefix(':account', [
      index('routes/account.tsx'),
      ...prefix(':project', [index('routes/project.tsx')]),
    ]),
  ]),
] satisfies RouteConfig;
