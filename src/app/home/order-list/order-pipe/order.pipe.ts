import { Pipe, PipeTransform } from '@angular/core';
import { parseISO } from 'date-fns';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValid from 'date-fns/isValid';
import { fr } from 'date-fns/locale';

import { ExpectedReceiveDate, Order } from 'src/app/model/order.model';

function ensureDate(date: Date | string): Date {
    return typeof date === 'string' ? parseISO(date) : date;
}

function formatLong(date: Date | string): string {
    const realDate = ensureDate(date);
    if (isValid(realDate)) {
        return format(realDate, 'P', { locale: fr });
    } else {
        return 'Invalid Date';
    }
}
function formatDayMonth(date: Date | string): string {
    const realDate = ensureDate(date);
    if (isValid(realDate)) {
        return format(realDate, 'dd/MM', { locale: fr });
    }
    return '';
}
function formatMonthYear(date: Date | string): string {
    const realDate = ensureDate(date);
    if (isValid(realDate)) {
        return format(realDate, 'MM/yyyy', { locale: fr });
    }
    return '';
}

@Pipe({
    name: 'order',
})
export class OrderPipe implements PipeTransform {
    transform(order: Order): string {
        const placedDate = formatLong(order.placedOnDate);
        const expectedDate = this.expected(order.expectedReceiveDate);
        const receivedDate = this.received(order.receiveDate);
        return `${placedDate} ${order.shop}: ${order.label}${expectedDate}${receivedDate}`;
    }

    private expected(date: ExpectedReceiveDate | undefined): string {
        if (!date) {
            return '';
        }
        switch (date.type) {
            case 'DATE':
                return ` (&rarr; ${formatLong(date.date)})`;
            case 'MONTH':
                return ` (&rarr; ${formatMonthYear(date.date)})`;
            case 'RANGE':
                const from = ensureDate(date.from);
                const to = ensureDate(date.to);
                if (isSameYear(from, to)) {
                    if (isSameMonth(from, to)) {
                        return ` (&rarr; ${getDate(from)}-${formatLong(to)})`;
                    } else {
                        return ` (&rarr; ${formatDayMonth(from)}-${formatLong(to)})`;
                    }
                } else {
                    return ` (&rarr; ${formatLong(from)}-${formatLong(to)})`;
                }
        }
    }

    private received(receiveDate: Date | string | undefined): string {
        if (receiveDate) {
            return ` &rarr; ${formatLong(receiveDate)}`;
        } else {
            return '';
        }
    }
}
