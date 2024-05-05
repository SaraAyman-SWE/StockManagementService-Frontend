interface OrderCreateDto {
  type: string;
  quantity: number;
  stockSymbol: string;
}

interface OrderResponseDto {
  type: string;
  quantity: number;
  stockSymbol: string;
  createdAt: Date;
}