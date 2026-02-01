import helper from "../../helpers/common.helper.js";
import {ExceptionBadRequest} from "../../helpers/exception.helper.js";

const authValidator = {
    register (req, res, next) {
        const required = {
            'email': 'string',
            'password': 'string',
            'name': 'string'
        };
        const {email, password, name, birthDate} = req.body;
        console.log({email, password, name});
    
        // Validate required params
        let errorMess = helper.verifyRequired(required, req.body)
        if (errorMess) throw new ExceptionBadRequest(errorMess)
        
        // validate email
        const isValidEmail = helper.verifyEmail(email);
        if (!isValidEmail) throw new ExceptionBadRequest("Invalid email format");
    
        // validate date
        if (birthDate && !helper.isValidDate(birthDate)) {
            throw new ExceptionBadRequest("Birthday must be YYYY-MM-DD");
        }
    
        next();
    },

    verifyOtp (req, res, next) {
        const required = {
            'userId': 'number',
            'verifyCode': 'string',
        };
        const regex = /^[a-zA-Z0-9]{6}$/;
        const {verifyCode} = req.body

        // Validate required params
        let errorMess = helper.verifyRequired(required, req.body)
        if (errorMess) throw new ExceptionBadRequest(errorMess)
        
        if (!regex.test(verifyCode)) throw new ExceptionBadRequest("OTP code is in wrong format!")

        next();
    },

    genOtp (req, res, next) {
        const required = {
            'userId': 'number'
        };
        // Validate required params
        let errorMess = helper.verifyRequired(required, req.body)
        if (errorMess) throw new ExceptionBadRequest(errorMess)

        next();
    },

    login (req, res, next) {
        const required = {
            'email': 'string',
            'password': 'string'
        };
        // Validate required params
        let errorMess = helper.verifyRequired(required, req.body)
        if (errorMess) throw new ExceptionBadRequest(errorMess)

        next();
    },

    refreshToken (req, res, next) {
        const required = {
            'accessToken': 'string',
            'refreshToken': 'string'
        };
        // Validate required params
        let errorMess = helper.verifyRequired(required, req.body)
        if (errorMess) throw new ExceptionBadRequest(errorMess)

        next();
    },

    logout (req, res, next) {
        const required = {
            'userId': 'number',
        };
        // Validate required params
        let errorMess = helper.verifyRequired(required, req.body)
        if (errorMess) throw new ExceptionBadRequest(errorMess)

        next();
    },
};

export default authValidator;