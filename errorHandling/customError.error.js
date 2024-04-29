export default class ApplicationError extends Error {
  constructor(err, code) {
    super(err);
    this.code = code;
  }
}
