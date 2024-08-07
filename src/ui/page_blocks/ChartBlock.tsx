import { useEffect, useState } from 'react';

import { BarChart } from '../components/Chart';
import { ChartDataType } from './types';
import { useToastContext } from '../providers/toast';

export function ChartBlock() {
  const { renderToast } = useToastContext();
  const [data, setData] = useState<ChartDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/chart-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        if (fetchedData.status === 'error') {
          renderToast('error', 'Data fetching error!');
        } else {
          setData(fetchedData);
          renderToast('success', 'Data fetched successfully!');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
          renderToast('error', error.message);
        } else {
          renderToast('error', 'An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [renderToast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className='mb-12 flex items-center'>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Min</span>
          <input type='number' className='w-24 h-8 text-sm' />
        </div>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Max</span>
          <input type='number' className='w-24 h-8 text-sm' />
        </div>
        <div className='flex flex-col mx-4 pt-4 w-100'>
          <button className='bg-blue-600 flex justify-center items-center h-10 text-center text-white border focus:outline-none focus:ring-4 font-sm rounded-lg text-sm px-5 py-1.9'>
            Reset
          </button>
        </div>
      </div>
      <div>
        <BarChart
          width={600}
          height={300}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                label: 'Dataset 1',
                data: data?.data?.datasetOne ?? [],
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Dataset 2',
                data: data?.data?.datasetTwo ?? [],
                backgroundColor: 'rgb(54, 162, 235)',
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
