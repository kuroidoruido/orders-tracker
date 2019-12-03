import { Injectable } from '@angular/core';
import XRegExp from 'xregexp';

import { Order } from '../../model/order.model';

function cleanupObject(input: { [key: string]: string }) {
  const res = {};
  Object.entries(input).forEach(([key, value]) => {
    if (typeof value === 'string' && isNaN(parseFloat(key)) && key !== 'input') {
      res[key] = value.trim();
    }
  });
  return res;
}

const LINE_START = '^';
const LINE_END = '$';
/**
 * match simple date pattern dd/MM/yyyy or MM/dd/yyyy
 */
const DATE_PATTERN = '\\d{0,2}(\\/\\d{0,2}(\\/\\d{0,4})?)?';

/**
 * match simple date pattern
 */
const ORDER_DATE_PATTERN = `(?<orderDate>${DATE_PATTERN})?`;
/**
 * match store and seller pattern: "store:" or "store/seller:"
 *
 * reject "/seller:"
 */
const STORE_AND_SELLER_PATTERN = '((?<store>[^\\/]*)(\\/(?<seller>.*))?:)?';
/**
 * match expected received date : "(>dd/MM/yyyy)" or "(>MM/dd/yyyy)"
 */
const EXPECTED_RECEIVED_DATE = `(\\(>(?<expectedReceivedDate>${DATE_PATTERN})\\))?`;
/**
 * match received date : ">dd/MM/yyyy" or ">MM/dd/yyyy"
 */
const RECEIVED_DATE = `([^\\(]*>(?<receivedDate>${DATE_PATTERN})[^\\)]*)?`;
/**
 * match label : anything except other patterns
 */
const LABEL_PATTERN = '(?<label>[^:(\\(>)>]*)?';

const STR_PATTERN =
  LINE_START +
  ORDER_DATE_PATTERN +
  STORE_AND_SELLER_PATTERN +
  LABEL_PATTERN +
  EXPECTED_RECEIVED_DATE +
  RECEIVED_DATE +
  LINE_END;

const REGEXP_PATTERN = XRegExp(STR_PATTERN);

function isNotEmpty(s: string): boolean {
  return typeof s === 'string' && s.length > 0;
}
function ifIsSet(s: string | undefined, suffix?: string, prefix?: string): string {
  if (isNotEmpty(s)) {
    return `${prefix || ''}${s}${suffix || ''}`;
  } else {
    return undefined;
  }
}

function concatStoreAndSeller(
  orderStore: string | undefined,
  orderSeller: string | undefined,
  separator: string,
  suffix?: string,
  prefix?: string,
): string {
  const store = ifIsSet(orderStore);
  const seller = ifIsSet(orderSeller);
  const storeIsDefined = isNotEmpty(store);
  const sellerIsDefined = isNotEmpty(seller);
  const strPrefix = prefix || '';
  const strSuffix = suffix || '';

  if (storeIsDefined && !sellerIsDefined) {
    return `${strPrefix}${store}${strSuffix}`;
  } else if (!storeIsDefined && sellerIsDefined) {
    return `${strPrefix}${separator}${seller}${strSuffix}`;
  } else if (storeIsDefined && sellerIsDefined) {
    return `${strPrefix}${store}${separator}${seller}${strSuffix}`;
  } else {
    return '';
  }
}

@Injectable({
  providedIn: 'root',
})
export class OrderStringParserService {
  constructor() {}

  parse(str: string): Partial<Order> {
    const found = XRegExp.exec(str, REGEXP_PATTERN);
    if (found && found.length > 0) {
      return cleanupObject(found);
    } else {
      return {};
    }
  }

  stringify(order: Partial<Order>): string {
    if (order) {
      const orderDate = ifIsSet(order.orderDate);
      const storeAndSeller = concatStoreAndSeller(order.store, order.seller, '/', ':');
      const label = ifIsSet(order.label);
      const expectedReceivedDate = ifIsSet(order.expectedReceivedDate, ')', '(>');
      const receivedDate = ifIsSet(order.receivedDate, undefined, '>');

      return [orderDate, storeAndSeller, label, expectedReceivedDate, receivedDate]
        .filter(Boolean)
        .join(' ');
    } else {
      return '';
    }
  }
}
