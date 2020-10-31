import { Order, OrderStatus } from 'src/app/model/order.model';
import { OrderPipe } from './order.pipe';

describe('OrderPipe', () => {
    it('create an instance', () => {
        const pipe = new OrderPipe();
        expect(pipe).toBeTruthy();
    });

    it('should format correctly OPEN order', () => {
        const pipe = new OrderPipe();
        const order: Order = {
            id: '1',
            type: 'ORDER',
            placedOnDate: new Date('2020-10-29'),
            shop: 'AliExpress',
            label: 'Creality Ender 3 v1',
            status: 'OPEN',
            expectedReceiveDate: { type: 'DATE', date: new Date('2020-02-01') },
        };
        const expected = `29/10/2020 AliExpress: Creality Ender 3 v1 (&rarr; 01/02/2020)`;
        expect(pipe.transform(order)).toEqual(expected);
    });

    it('should format correctly OPEN order without expected received date', () => {
        const pipe = new OrderPipe();
        const order: Order = {
            id: '1',
            type: 'ORDER',
            placedOnDate: new Date('2020-10-29'),
            shop: 'AliExpress',
            label: 'Creality Ender 3 v1',
            status: 'OPEN',
        };
        const expected = `29/10/2020 AliExpress: Creality Ender 3 v1`;
        expect(pipe.transform(order)).toEqual(expected);
    });

    it('should format correctly RECEIVED order with a range received date with different day/month', () => {
        const pipe = new OrderPipe();
        const order: Order = {
            id: '1',
            type: 'ORDER',
            placedOnDate: new Date('2020-08-20'),
            shop: 'Ebay',
            label: 'Gunpey (Wonderswan)',
            status: 'RECEIVED',
            expectedReceiveDate: { type: 'RANGE', from: new Date('2020-08-20'), to: new Date('2020-09-07') },
            receiveDate: new Date('2020-08-24'),
        };
        const expected = `20/08/2020 Ebay: Gunpey (Wonderswan) (&rarr; 20/08-07/09/2020) &rarr; 24/08/2020`;
        expect(pipe.transform(order)).toEqual(expected);
    });
    it('should format correctly RECEIVED order with a range received date with different day', () => {
        const pipe = new OrderPipe();
        const order: Order = {
            id: '1',
            type: 'ORDER',
            placedOnDate: new Date('2020-08-20'),
            shop: 'Ebay',
            label: 'Gunpey (Wonderswan)',
            status: 'RECEIVED',
            expectedReceiveDate: { type: 'RANGE', from: new Date('2020-08-10'), to: new Date('2020-08-17') },
            receiveDate: new Date('2020-08-24'),
        };
        const expected = `20/08/2020 Ebay: Gunpey (Wonderswan) (&rarr; 10-17/08/2020) &rarr; 24/08/2020`;
        expect(pipe.transform(order)).toEqual(expected);
    });
    it('should format correctly RECEIVED order with a month received date', () => {
        const pipe = new OrderPipe();
        const order: Order = {
            id: '1',
            type: 'ORDER',
            placedOnDate: new Date('2020-08-20'),
            shop: 'Ebay',
            label: 'Gunpey (Wonderswan)',
            status: 'RECEIVED',
            expectedReceiveDate: { type: 'MONTH', date: new Date('2020-08-01') },
            receiveDate: new Date('2020-08-24'),
        };
        const expected = `20/08/2020 Ebay: Gunpey (Wonderswan) (&rarr; 08/2020) &rarr; 24/08/2020`;
        expect(pipe.transform(order)).toEqual(expected);
    });
    it('should format correctly order with string dates', () => {
        const pipe = new OrderPipe();
        const order: Order = {
            id: '1',
            type: 'ORDER',
            placedOnDate: '2020-08-20',
            shop: 'Ebay',
            label: 'Gunpey (Wonderswan)',
            status: 'RECEIVED',
            expectedReceiveDate: { type: 'RANGE', from: '2020-08-10', to: '2020-08-17' },
            receiveDate: '2020-08-24',
        };
        const expected = `20/08/2020 Ebay: Gunpey (Wonderswan) (&rarr; 10-17/08/2020) &rarr; 24/08/2020`;
        expect(pipe.transform(order)).toEqual(expected);
    });
});
