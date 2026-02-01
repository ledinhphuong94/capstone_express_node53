import StatusCode from "../constant/statusCode.constant.js";

/**
 * This response means that server could not understand the request due to invalid syntax.
 */
export class ExceptionBadRequest extends Error {
    constructor (message) {
        super(message);
        this.errCode = StatusCode.BAD_REQUEST
    }
};

/**
 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 */
export class ExceptionUnauthorized extends Error {
    constructor (message) {
        super(message);
        this.errCode = StatusCode.UNAUTHORIZED
    }
};

/**
* The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
 */
export class ExceptionForbidden extends Error {
    constructor (message) {
        super(message);
        this.errCode = StatusCode.FORBIDDEN
    }
};

/**
 * The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.
 */
export class ExceptionNotFound extends Error {
    constructor (message) {
        super(message);
        this.errCode = StatusCode.NOT_FOUND
    }
};