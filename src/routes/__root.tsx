import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen w-screen'>
      <nav className="p-4 flex gap-4 sticky top-0 w-full border-b bg-gray-500/95 backdrop-blur-md items-center justify-center text-xl">
        <Link className='duration-200 py-1 px-2 text-gray-300 hover:text-gray-100 hover:border-gray-100 border-transparent border-b-2' to="/">
          Users
        </Link>
        <Link className='duration-200 py-1 px-2 text-gray-300 hover:text-gray-100 hover:border-gray-100 border-transparent border-b-2' to="/jokes">
          Jokes
        </Link>
      </nav>
      <Outlet />
    </div>
  ),
})