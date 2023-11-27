import { getTopTrends, getTrendsPrices } from '@/services/trends';
import { Suspense } from 'react';
import { formatEther } from 'viem';

interface TopTrendsTableProps {
  date: string;
}

export const fetchCache = 'force-no-store';

export default function TopTrendsTable({ date }: TopTrendsTableProps) {
  return (
    <table className='inline-flex h-[1008px] w-[656px] flex-col items-start justify-start gap-px overflow-y-auto rounded-[9px] border border-neutral-800'>
      <TableHeader />
      <Suspense fallback={<TopTrendsTableLoadingSkeleton />}>
        <TableBody date={date} />
      </Suspense>
    </table>
  );
}

function TableHeader() {
  return (
    <thead className='inline-flex items-start justify-start rounded-[9px]'>
      <tr>
        <th
          scope='col'
          className='inline-flex h-7 w-[52px] items-center justify-start gap-1.5 rounded-tl-[9px] border-b border-neutral-800 bg-neutral-800 py-2 pl-3 pr-2'
        >
          <p className='text-xs font-medium uppercase leading-3 text-neutral-400'>
            rank
          </p>
        </th>
        <th
          scope='col'
          className='inline-flex h-7 w-[341px] items-center justify-start gap-1.5 border-b border-neutral-800 bg-neutral-800 py-2 pl-3 pr-2'
        >
          <p className='text-xs font-medium uppercase leading-3 text-neutral-400'>
            trend name
          </p>
        </th>
        <th
          scope='col'
          className='inline-flex h-7 w-[129px] items-center justify-start gap-1.5 border-b border-neutral-800 bg-neutral-800 py-2 pl-3 pr-2'
        >
          <p className='text-xs font-medium uppercase leading-3 text-neutral-400'>
            holders
          </p>
        </th>
        <th
          scope='col'
          className='inline-flex h-7 w-[132px] items-center justify-start gap-1.5 border-b border-neutral-800 bg-neutral-800 py-2 pl-3 pr-2'
        >
          <span className='text-xs font-medium uppercase leading-3 text-neutral-400'>
            PAYOUT{' '}
          </span>
          <span className='text-xs font-medium uppercase leading-3 text-zinc-600'>
            (eth)
          </span>
        </th>
      </tr>
    </thead>
  );
}

async function TableBody({ date }: TopTrendsTableProps) {
  const topTrends = await getTopTrends();
  const trendsHashes = topTrends.trends.map((trend: any) => trend.trendHash);
  const trendsPrices = await getTrendsPrices({ trends: trendsHashes });

  return (
    <tbody className='overflow-y-auto'>
      {topTrends.trends.map((trend: any, idx: number) => {
        const name = trend.trend;
        const trendPrice = trendsPrices.prices[`BUY-${trend.trendHash}`];

        return (
          <tr key={idx}>
            <td
              scope='row'
              className='inline-flex h-[68px] w-[52px] flex-col items-center justify-center border-b border-neutral-800 bg-neutral-900 px-2'
            >
              <p className='leading-none" text-sm font-medium text-zinc-600'>
                {idx + 1}
              </p>
            </td>
            <td
              scope='row'
              className='inline-flex h-[68px] w-[341px] items-center justify-start gap-2 border-b border-neutral-800 bg-neutral-900 p-2'
            >
              <p className='text-center text-xl font-medium leading-tight text-gray-200'>
                {name}
              </p>
            </td>
            <td
              scope='row'
              className='inline-flex h-[68px] w-[129px] flex-col items-start justify-center border-b border-neutral-800 bg-neutral-900 px-3'
            >
              <p className='text-base font-medium leading-[21px] text-zinc-600'>
                {trend.holders}
              </p>
            </td>
            <td
              scope='row'
              className='inline-flex h-[68px] w-[132px] flex-col items-start justify-center border-b border-neutral-800 bg-neutral-900 px-3'
            >
              <p className='text-base font-medium leading-[21px] text-zinc-600'>
                {formatEther(BigInt(trendPrice))}
              </p>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function TopTrendsTableLoadingSkeleton() {
  const dataRows = new Array(30).fill(0);

  return (
    <tbody className='w-[858px]'>
      {dataRows.map((_, idx) => (
        <tr key={idx}>
          <td
            scope='row'
            className='inline-flex h-[68px] w-[52px] flex-col items-center justify-center border-b border-neutral-800 bg-neutral-900 px-2'
          >
            <p className='leading-none" text-sm font-medium text-zinc-600'>
              {idx + 1}
            </p>
          </td>
          <td
            scope='row'
            className='inline-flex h-[68px] w-[341px] items-center justify-start gap-2 border-b border-neutral-800 bg-neutral-900 p-2'
          >
            <p className='h-2 w-full animate-pulse rounded-full bg-gray-300' />
          </td>
          <td
            scope='row'
            className='inline-flex h-[68px] w-[129px] flex-col items-start justify-center border-b border-neutral-800 bg-neutral-900 px-3'
          >
            <p className='h-2 w-full animate-pulse rounded-full bg-gray-300' />
          </td>
          <td
            scope='row'
            className='inline-flex h-[68px] w-[132px] flex-col items-start justify-center border-b border-neutral-800 bg-neutral-900 px-3'
          >
            <p className='h-2 w-full animate-pulse rounded-full bg-gray-300' />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
