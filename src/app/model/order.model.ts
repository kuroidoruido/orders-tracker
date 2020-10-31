export type OrderType = 'ORDER' | 'PRE-ORDER' | 'CROWDFOUNDING';

export interface ExpectedReceiveDateRange {
    type: 'RANGE';
    from: Date | string;
    to: Date | string;
}

export interface ExpectedReceiveDateDate {
    type: 'DATE';
    date: Date | string;
}

export interface ExpectedReceiveDateMonth {
    type: 'MONTH';
    date: Date | string;
}

export type ExpectedReceiveDate = ExpectedReceiveDateRange | ExpectedReceiveDateDate | ExpectedReceiveDateMonth;

export type OrderStatus = 'OPEN' | 'SHIPPED' | 'RECEIVED' | 'LOST' | 'CANCELED';

export interface Order {
    id: string;
    type: OrderType;
    placedOnDate: Date | string;
    shop: string;
    label: string;
    expectedReceiveDate?: ExpectedReceiveDate;
    receiveDate?: Date | string;
    status: OrderStatus;
}
