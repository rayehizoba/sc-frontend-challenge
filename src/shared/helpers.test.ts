import {
  flattenObject,
  foundInObj,
  getMeanValue,
  getStandardDeviation,
  searchHandler,
} from './helpers';

test('should return 3 as the mean value of 1,2,3,4,5', () => {
  const list = [1, 2, 3, 4, 5];
  expect(getMeanValue(list)).toBe(3);
});

test('should return 1.4142135623730951 as standard deviation of 1,2,3,4,5', () => {
  const list = [1, 2, 3, 4, 5];
  const mean = getMeanValue(list);
  expect(getStandardDeviation(list, mean)).toBe(1.4142135623730951);
});

test('should find "foo" in {firstname: "foo", lastname: "bar"}', () => {
  const testVal = { 'firstname': 'foo', 'lastname': 'bar' };
  const testField = 'firstname';
  const testSearchTerm = 'foo';
  expect(foundInObj(testVal, testField, testSearchTerm)).toBeTruthy();
});

test('should return a list with one item that includes the search term given a list of search fields', () => {
  const list = [
    { 'firstname': 'jon', 'lastname': 'foo' },
    { 'firstname': 'doe', 'lastname': 'bar' },
  ];
  const searchTerm = 'jon';
  const searchFields = ['firstname', 'lastname'];
  expect(searchHandler(list, searchTerm, searchFields).length).toEqual(1);
});

test('should return an empty list given a search term and a list of search fields', () => {
  const list = [
    { 'firstname': 'jon', 'lastname': 'foo' },
    { 'firstname': 'doe', 'lastname': 'bar' },
  ];
  const searchTerm = 'abc';
  const searchFields = ['firstname', 'lastname'];
  expect(searchHandler(list, searchTerm, searchFields).length).toEqual(0);
});

test('should flatten a given nested object', () => {
  const testObj = {
    'name': {
      'first': 'jon',
      'last': 'smith'
    },
    'age': 20
  };
  const flattenedObj = flattenObject(testObj);
  const expectedObj = {
    'name.first': 'jon',
    'name.last': 'smith',
    'age': 20
  };
  expect(flattenedObj).toEqual(expectedObj);
});
