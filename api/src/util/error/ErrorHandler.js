class ErrorHandler {
  handleErrors(err, res) {

    switch(err.name) {
      case 'NotFoundError':
        res.status(404).json({message: 'Model Not Found', field: err.field});
        break;

      default:
        res.status(500).json({message: 'Error executing database operation', error: err});
    }
  }
}

export default ErrorHandler;
