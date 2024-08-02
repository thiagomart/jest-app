const { queryString, parse } = require('./queryStrings');
const obj = {
  name: 'Thiago',
  profession: 'developer',
};
describe('Object to query string', () => {
  it('should create a valid query string when and object is passed', () => {
    expect(queryString(obj)).toBe('name=Thiago&profession=developer');
  });
  it('should create a valid query string when and object is passed', () => {
    const obj = {
      name: 'Thiago',
      abilities: ['JS', 'TDD'],
    };
    expect(queryString(obj)).toBe('name=Thiago&abilities=JS,TDD');
  });
  it('should throw an error when an object is passed as variable passed', () => {
    const obj = {
      name: 'Thiago',
      abilities: {
        first: 'TDD',
      },
    };

    expect(() => queryString(obj)).toThrow();
  });
});

describe('Object to query object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Thiago&profession=developer';
    expect(parse(qs)).toEqual(obj);
  });
  it('should convert a query string of a single key value to object', () => {
    const qs = 'name=Thiago';
    expect(parse(qs)).toEqual({ name: 'Thiago' });
  });
  it('should convert a query string to an object taking care a comma separate values', () => {
    const qs = 'name=Thiago&abilities=JS,TDD';
    expect(parse(qs)).toEqual({ name: 'Thiago', abilities: ['JS', 'TDD'] });
  });
});
