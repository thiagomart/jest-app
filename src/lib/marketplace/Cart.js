import _find from 'lodash/find';
import _remove from 'lodash/remove';
import Dinero from 'dinero.js';
import { calculateDiscount } from './Shared';
const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };

    if (_find(this.items, itemToFind)) {
      _remove(this.items, itemToFind);
    }

    this.items.push(item);
  }
  getTotal() {
    return this.items.reduce((acc, { quantity, product, condition }) => {
      const amount = Money({ amount: quantity * product.price });
      let discount = Money({ amount: 0 });
      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }
      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }
  remove(product) {
    _remove(this.items, { product });
  }
  summary() {
    const total = this.getTotal().getAmount();
    const items = this.items;
    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();
    this.items = [];
    return {
      total,
      items,
    };
  }
}

export { Cart };
