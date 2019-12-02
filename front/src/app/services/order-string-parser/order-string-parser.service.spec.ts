import { TestBed } from '@angular/core/testing';

import { Order } from '../model/order.model';

import { OrderStringParserService } from './order-string-parser.service';

describe('OrderStringParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderStringParserService = TestBed.get(OrderStringParserService);
    expect(service).toBeTruthy();
  });

  describe('should parse basic', () => {
    let service: OrderStringParserService;
    beforeEach(() => {
      service = new OrderStringParserService();
    });

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
    let service: OrderStringParserService;
    beforeEach(() => {
      service = new OrderStringParserService();
    });

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
