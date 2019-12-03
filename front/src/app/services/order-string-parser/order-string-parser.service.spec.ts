import { TestBed } from '@angular/core/testing';

import { Order } from '../../model/order.model';

import { OrderStringParserService } from './order-string-parser.service';
import { stringify } from 'querystring';

describe('OrderStringParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderStringParserService = TestBed.get(OrderStringParserService);
    expect(service).toBeTruthy();
  });

  describe('parse', () => {
    let service: OrderStringParserService;
    beforeEach(() => {
      service = new OrderStringParserService();
    });
    describe('should parse basic', () => {
      it('label only string', () => {
        const strOrder = 'Mario Picross 2';
        const order: Partial<Order> = {
          label: strOrder,
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('date only string', () => {
        const strOrder = '28/11/2019';
        const order: Partial<Order> = {
          orderDate: strOrder,
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store only string', () => {
        const strOrder = 'Ebay:';
        const order: Partial<Order> = {
          store: 'Ebay',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store and seller only string', () => {
        const strOrder = 'Ebay/SuperStore22:';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('expected received date only string', () => {
        const strOrder = '(>03/12/2019)';
        const order: Partial<Order> = {
          expectedReceivedDate: '03/12/2019',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('received date only string', () => {
        const strOrder = '>04/12/2019';
        const order: Partial<Order> = {
          receivedDate: '04/12/2019',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });
    });

    describe('should parse user sequence', () => {
      it('empty', () => {
        const strOrder = '';
        const order: Partial<Order> = {};
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('partial store', () => {
        const strOrder = 'Eba';
        const order: Partial<Order> = {
          label: 'Eba',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('finish store', () => {
        const strOrder = 'Ebay:';
        const order: Partial<Order> = {
          store: 'Ebay',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store and partial label', () => {
        const strOrder = 'Ebay: Mario ';
        const order: Partial<Order> = {
          store: 'Ebay',
          label: 'Mario',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store and label', () => {
        const strOrder = 'Ebay: Mario Picross 2';
        const order: Partial<Order> = {
          store: 'Ebay',
          label: 'Mario Picross 2',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, empty seller and label', () => {
        const strOrder = 'Ebay/: Mario Picross 2';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: '',
          label: 'Mario Picross 2',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, seller and label', () => {
        const strOrder = 'Ebay/SuperStore22: Mario Picross 2';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, seller, label and partial expected date', () => {
        const strOrder = 'Ebay/SuperStore22: Mario Picross 2 (>';
        const order: Partial<Order> = {};
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, seller, label and partial expected date', () => {
        const strOrder = 'Ebay/SuperStore22: Mario Picross 2 (>)';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          expectedReceivedDate: '',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, seller, label and partial expected date (day)', () => {
        const strOrder = 'Ebay/SuperStore22: Mario Picross 2 (>03)';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, seller, label and partial expected date (day+month)', () => {
        const strOrder = 'Ebay/SuperStore22: Mario Picross 2 (>03/12)';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, seller, label and partial expected date (day+month+/)', () => {
        const strOrder = 'Ebay/SuperStore22: Mario Picross 2 (>03/12/)';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });

      it('store, seller, label and partial expected date (day+month+year)', () => {
        const strOrder = 'Ebay/SuperStore22: Mario Picross 2 (>03/12/19)';
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/19',
        };
        expect(service.parse(strOrder)).toEqual(order);
      });
    });
  });

  describe('stringify', () => {
    let service: OrderStringParserService;
    beforeEach(() => {
      service = new OrderStringParserService();
    });
    describe('should stringify basic', () => {
      it('orderDate only order', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
        };
        const expected = '28/11/2019';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('store only order', () => {
        const order: Partial<Order> = {
          store: 'Ebay',
        };
        const expected = 'Ebay:';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('seller only order', () => {
        const order: Partial<Order> = {
          seller: 'SuperStore22',
        };
        const expected = '/SuperStore22:';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('store and seller only order', () => {
        const order: Partial<Order> = {
          store: 'Ebay',
          seller: 'SuperStore22',
        };
        const expected = 'Ebay/SuperStore22:';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('label only order', () => {
        const order: Partial<Order> = {
          label: 'Mario Picross 2',
        };
        const expected = 'Mario Picross 2';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('expectedReceivedDate only order', () => {
        const order: Partial<Order> = {
          expectedReceivedDate: '03/12/2019',
        };
        const expected = '(>03/12/2019)';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('receivedDate only order', () => {
        const order: Partial<Order> = {
          receivedDate: '04/12/2019',
        };
        const expected = '>04/12/2019';
        expect(service.stringify(order)).toEqual(expected);
      });
    });

    describe('should stringify complexe order', () => {
      it('with all basic fields', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          store: 'Ebay',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/2019',
        };
        const expected = '28/11/2019 Ebay: Mario Picross 2 (>03/12/2019)';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('with all fields', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/2019',
          receivedDate: '04/12/2019',
        };
        const expected = '28/11/2019 Ebay/SuperStore22: Mario Picross 2 (>03/12/2019) >04/12/2019';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('without expectedReceivedDate', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          receivedDate: '04/12/2019',
        };
        const expected = '28/11/2019 Ebay/SuperStore22: Mario Picross 2 >04/12/2019';
        expect(service.stringify(order)).toEqual(expected);
      });
      it('without store nor seller nor receivedDate', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/2019',
        };
        const expected = '28/11/2019 Mario Picross 2 (>03/12/2019)';
        expect(service.stringify(order)).toEqual(expected);
      });
    });
  });

  describe('parse+stringify compatibility', () => {
    let service: OrderStringParserService;
    beforeEach(() => {
      service = new OrderStringParserService();
    });
    describe('parse(stringify(order)) === order', () => {
      it('with all basic fields', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          store: 'Ebay',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/2019',
        };
        expect(service.parse(service.stringify(order))).toEqual(order);
      });
      it('with all fields', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/2019',
          receivedDate: '04/12/2019',
        };
        expect(service.parse(service.stringify(order))).toEqual(order);
      });
      it('without expectedReceivedDate', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          store: 'Ebay',
          seller: 'SuperStore22',
          label: 'Mario Picross 2',
          receivedDate: '04/12/2019',
        };
        expect(service.parse(service.stringify(order))).toEqual(order);
      });
      it('without store nor seller nor receivedDate', () => {
        const order: Partial<Order> = {
          orderDate: '28/11/2019',
          label: 'Mario Picross 2',
          expectedReceivedDate: '03/12/2019',
        };
        expect(service.parse(service.stringify(order))).toEqual(order);
      });
    });
    describe('stringify(parse(strOrder)) === strOrder', () => {
      it('with all basic fields', () => {
        const order: string = '28/11/2019 Ebay: Mario Picross 2 (>03/12/2019)';
        expect(service.stringify(service.parse(order))).toEqual(order);
      });
      it('with all fields', () => {
        const order = '28/11/2019 Ebay/SuperStore22: Mario Picross 2 (>03/12/2019) >04/12/2019';
        expect(service.stringify(service.parse(order))).toEqual(order);
      });
      it('without expectedReceivedDate', () => {
        const order = '28/11/2019 Ebay/SuperStore22: Mario Picross 2 >04/12/2019';
        expect(service.stringify(service.parse(order))).toEqual(order);
      });
      it('without store nor seller nor receivedDate', () => {
        const order = '28/11/2019 Mario Picross 2 (>03/12/2019)';
        expect(service.stringify(service.parse(order))).toEqual(order);
      });
    });
  });
});
