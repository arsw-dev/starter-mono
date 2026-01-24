import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
  <>
    <div className="flex h-10 w-full items-center justify-center">
      <h1 className="text-3xl font-bold">Notes App</h1>
    </div>
    <Outlet />
    <TanStackRouterDevtools />
    <ReactQueryDevtools buttonPosition="top-right" />
  </>
);

const Route = createRootRoute({ component: RootLayout });

export { Route };
