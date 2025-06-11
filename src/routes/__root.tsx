import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="navigation">
        <Link to="/">
          Users
        </Link>
        <Link to="/jokes">
          Jokes
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})