interface Stock {
  symbol: string;
  askPrice: number;
  bidPrice: number;
  lastUpdated: Date;
}

interface HistoricalStock {
  open: number;
  high: number;
  low: number;
  close: number;
  date: Date;
}