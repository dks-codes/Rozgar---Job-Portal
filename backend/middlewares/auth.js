import { Applicant } from '../models/applicant.js';
import {CatchAsyncError} from './asyncErrors.js'
import {ErrorHandler} from './error.js'
import jwt from 'jsonwebtoken'

//performs authorization
export const isAuthorized = CatchAsyncError( async (req,res,next)=>{
    const token = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authorized", 400))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await Applicant.findById(decodedToken.id);
    next();
})