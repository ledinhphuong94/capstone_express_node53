import StatusCode from "../constant/statusCode.constant.js";
const resHelper = {
    successRes (code = StatusCode.OK, data, message="OK") {
        return {
            "status": true,
            "statusCode": code,
            "message": message,
            "data": data,
            "doc": "meditationshare.com/developer/docs"
        }
    },

    errorRes (code = StatusCode.BAD_REQUEST, message="Fail") {
        return {
            "status": false,
            "statusCode": code,
            "message": message,
            "doc": "meditationshare.com/developer/docs"
        }
    },
};

export default resHelper;