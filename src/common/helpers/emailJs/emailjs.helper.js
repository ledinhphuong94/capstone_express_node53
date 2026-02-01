import emailjs, { EmailJSResponseStatus } from '@emailjs/nodejs';
import {EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY, VERIFY_CODE_TIME} from "../../constant/common.constant.js";
import {ExceptionNotFound} from "../../helpers/exception.helper.js";

const emailjsHelper = {
    async sendOTPEmail (passcode, email) {
        try {
            const templateParams = {
                passcode: passcode,
                expireMin: VERIFY_CODE_TIME,
                email: email
            };
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                {
                    publicKey: EMAILJS_PUBLIC_KEY,
                    privateKey: EMAILJS_PRIVATE_KEY, 
                },
            );
            console.log('SUCCESS!');
        } catch (err) {
            if (err instanceof EmailJSResponseStatus) {
                console.log('EMAILJS FAILED...', err);
                throw new ExceptionNotFound(err.text)
            }

            console.log('ERROR', err);
        }
    }
}

export default emailjsHelper;