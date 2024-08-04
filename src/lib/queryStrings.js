const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }
  return `${key}=${value}`;
};

const queryString = (obj) => {
  return Object.entries(obj).map(keyValueToString).join('&');
};

const parse = (string) => {
  return Object.fromEntries(
    string.split('&').map((item) => {
      let [key, value] = item.split('=');
      if (value.indexOf(',') > -1) {
        value = value.split(',');
      }
      return [key, value];
    }),
  );
};

export { parse, queryString };
