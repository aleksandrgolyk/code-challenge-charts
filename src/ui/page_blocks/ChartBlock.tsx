import { useFilterData, useResetData } from './helpers/filterAndResetData';

import { BarChart } from '../components/Chart';
import { ChartDataType } from './types';
import { useFetchData } from './hooks/useFetchData';
import { useState } from 'react';

export function ChartBlock() {
  const [data, setData] = useState<ChartDataType | null>(null);
  const [originalData, setOriginalData] = useState<ChartDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);

  // Fetch data
  useFetchData(setData, setOriginalData, setLoading, setError);

  // Filter data based on min and max values
  useFilterData(originalData, minValue, maxValue, setData);

  // Create reset function
  const resetData = useResetData(originalData, setData, setMinValue, setMaxValue);

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
          <input
            type='number'
            className='w-24 h-8 text-sm'
            value={minValue !== null ? minValue : ''}
            onChange={e => setMinValue(e.target.value === '' ? null : parseFloat(e.target.value))}
          />
        </div>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Max</span>
          <input
            type='number'
            className='w-24 h-8 text-sm'
            value={maxValue !== null ? maxValue : ''}
            onChange={e => setMaxValue(e.target.value === '' ? null : parseFloat(e.target.value))}
          />
        </div>
        <div className='flex flex-col mx-4 pt-4 w-100'>
          <button
            className='bg-blue-600 flex justify-center items-center h-10 text-center text-white border focus:outline-none focus:ring-4 font-sm rounded-lg text-sm px-5 py-1.9'
            onClick={resetData}>
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
