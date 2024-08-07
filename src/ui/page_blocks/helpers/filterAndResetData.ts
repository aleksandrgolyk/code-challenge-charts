import { ChartDataType } from '../types';
import { useEffect } from 'react';

// filterAndResetData.ts
export const useFilterData = (
  originalData: ChartDataType | null,
  minValue: number | null,
  maxValue: number | null,
  setData: React.Dispatch<React.SetStateAction<ChartDataType | null>>,
) => {
  useEffect(() => {
    if (!originalData) return;

    const filteredData = {
      ...originalData,
      data: {
        datasetOne: originalData.data.datasetOne.filter(
          value => (minValue === null || value >= minValue) && (maxValue === null || value <= maxValue),
        ),
        datasetTwo: originalData.data.datasetTwo.filter(
          value => (minValue === null || value >= minValue) && (maxValue === null || value <= maxValue),
        ),
      },
    };

    setData(filteredData);
  }, [minValue, maxValue, originalData, setData]);
};

export const useResetData = (
  originalData: ChartDataType | null,
  setData: React.Dispatch<React.SetStateAction<ChartDataType | null>>,
  setMinValue: React.Dispatch<React.SetStateAction<number | null>>,
  setMaxValue: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  const resetData = () => {
    setData(originalData);
    setMinValue(null);
    setMaxValue(null);
  };

  return resetData;
};
