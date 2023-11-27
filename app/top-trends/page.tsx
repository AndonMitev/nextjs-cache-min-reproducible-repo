import { Metadata } from 'next';
import TopTrendsTable from './TopTrendsTable';

export const metadata: Metadata = {
  title: 'Top Trends'
};

export const fetchCache = 'force-no-store';

interface PageProps {
  searchParams: { [key: string]: string };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <main className='h-[1199px] min-w-[729px] flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-neutral-900 p-7'>
      <h1>Top trends</h1>
      <TopTrendsTable date={searchParams.date} />
    </main>
  );
}
