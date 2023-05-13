const errCodeInvalidData = 400;
const errCodeNotFound = 404;
const errCodeDefault = 500;
const dafaultErrorMessage = 'An error occurred on the server';
const urlPattern = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;

module.exports = {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  dafaultErrorMessage,
  urlPattern,
};
