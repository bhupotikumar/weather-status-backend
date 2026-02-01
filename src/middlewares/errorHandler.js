const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err); // log error

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default errorHandlerMiddleware;
