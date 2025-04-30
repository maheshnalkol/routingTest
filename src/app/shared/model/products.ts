export interface Iproduct {
  pName: string;
  prodId: string;
  pStatus: 'inprogress' | 'delivered' | 'dispatch';
  canReturn: number;
}
