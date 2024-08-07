import { Cart } from './Cart';

describe('Cart =>', () => {
  let cart;
  let product = {
    title: 'Adidas 1',
    price: 35388,
  };
  let product2 = {
    title: 'Adidas 2',
    price: 21388,
  };
  beforeEach(() => {
    cart = new Cart();
  });
  describe('getTotal() =>', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      cart.add({
        product,
        quantity: 2,
      });
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product,
        quantity: 1,
      });
      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when product gets included and then remove', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(product2.price);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product,
        quantity: 7,
      });
      expect(cart.checkout()).toMatchSnapshot();
    });
    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product,
        quantity: 7,
      });
      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });
    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('special conditions', () => {
    it('should apply percentage discount above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 3,
      });
      expect(cart.getTotal().getAmount()).toEqual(74315);
    });
    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 4,
      });
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 5,
      });
      expect(cart.getTotal().getAmount()).toEqual(106164);
    });
    it('should NOT apply percentage discount quantities is bellow quantity', () => {
      const condition = {
        percentage: 30,
        quantity: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 2,
      });
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
    it('should receive two or more conditions and determine/apply the best discount. First case.', () => {
      const condition1 = {
        percentage: 30,
        quantity: 2,
      };
      const condition2 = {
        quantity: 2,
      };
      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });
      expect(cart.getTotal().getAmount()).toEqual(106164);
    });
    it('should receive two or more conditions and determine/apply the best discount. Second case.', () => {
      const condition1 = {
        percentage: 80,
        quantity: 2,
      };
      const condition2 = {
        quantity: 2,
      };
      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });
      expect(cart.getTotal().getAmount()).toEqual(106164);
    });
  });
});
