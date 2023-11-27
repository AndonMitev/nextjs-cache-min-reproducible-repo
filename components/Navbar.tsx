import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex flex-row items-center justify-between space-x-10'>
      <NavLinks />
    </nav>
  );
}

function NavLinks() {
  return (
    <div className='flex min-w-max gap-10'>
      <Link
        href={'/'}
        className='text-base font-medium leading-[21px] text-zinc-500'
      >
        Trends
      </Link>
      <Link
        href={`/top-trends`}
        className='text-base font-medium leading-[21px] text-zinc-500'
      >
        Top Trends
      </Link>
    </div>
  );
}
