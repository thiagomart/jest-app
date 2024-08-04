import _find from 'lodash/find';
import _remove from 'lodash/remove';

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
    return this.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
  }
  remove(product) {
    _remove(this.items, { product });
  }
  summary() {
    const total = this.getTotal();
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
