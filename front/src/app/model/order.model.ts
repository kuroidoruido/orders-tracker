export interface Order {
  orderDate: string;
  store: string;
  seller?: string;
  label: string;
  expectedReceivedDate: string;
  receivedDate: string;
}
