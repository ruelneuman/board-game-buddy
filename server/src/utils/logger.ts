/* eslint-disable no-console */

const isTestEnvironment = process.env.NODE_ENV === 'test';

const logger = {
  info: (...params: [unknown]) => {
    if (!isTestEnvironment) {
      console.log(...params);
    }
  },
  error: (...params: [unknown]) => {
    if (!isTestEnvironment) {
      console.error(...params);
    }
  },
};

export default logger;
