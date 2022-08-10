interface ERROR_TYPE {
  [index: string]: number
}

const ERROR: ERROR_TYPE = {
  INVALID_TOKEN: 4001,
  EXPIRED_TOKEN: 4000
};

export default ERROR;
