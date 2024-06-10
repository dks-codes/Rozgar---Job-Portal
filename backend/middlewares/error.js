export default class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next)=>{
    err.message = err.message || 'Internal server error';
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const msg = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(msg, 400);
    }
    if(err.code === 11000){
        const msg = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(msg, 400);
    }
    if(err.name === "JsonWebTokenError"){
        const msg = `Json web token is invalid. Try Again!`;
        err = new ErrorHandler(msg, 400);
    }
    if(err.name === "TokenExpiredError"){
        const msg = `Json web token is expired. Try Again!`;
        err = new ErrorHandler(msg, 400);
    }
    return res.status(statusCode).json({
        success: false,
        message: err.message
    })
}