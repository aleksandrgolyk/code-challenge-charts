import { ChartDataType } from '../types';
import { useEffect } from 'react';
import { useToastContext } from '@/providers/toast';

export const useFetchData = (
  setData: React.Dispatch<React.SetStateAction<ChartDataType | null>>,
  setOriginalData: React.Dispatch<React.SetStateAction<ChartDataType | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>,
) => {
  const { renderToast } = useToastContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/chart-data');
        if (!response.ok) throw new Error('Network response was not ok');
        const fetchedData = await response.json();
        if (fetchedData.status === 'error') {
          renderToast('error', 'Data fetching error!');
        } else {
          setData(fetchedData);
          setOriginalData(fetchedData);
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
  }, [renderToast, setData, setOriginalData, setLoading, setError]);
};
