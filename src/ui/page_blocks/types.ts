export type Dataset = {
  datasetOne: number[];
  datasetTwo: number[];
};

export type ChartDataType = {
  data: Dataset;
  status: 'success' | 'error';
  message: string;
};
