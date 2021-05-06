// error handler, it same as middleware but  has four arguments

const errorHandler = (err, req, res, next) => {
  // always console log the error stack so there is a log of it on the server and we can always get back to it
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: "error occured",
      errMessage: err.message,
    });
};

module.exports = errorHandler;
