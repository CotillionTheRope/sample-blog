class NotFoundError extends Error {
  constructor(field, ...params) {
    super(...params);

    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }


    this.name = 'NotFoundError';
    this.field = field ? field : '';
    this.message = 'Not Found';
    this.type='NotFound';
  }
}

export default NotFoundError;
