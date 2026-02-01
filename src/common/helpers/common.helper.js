import crypto from 'crypto';

const commonHelper = {
    verifyEmail (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    verifyPassword(password) {
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain an uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain a lowercase letter";
        }
        if (!/\d/.test(password)) {
            return "Password must contain a number";
        }
        if (!/[@$!%*?&]/.test(password)) {
            return "Password must contain a special character";
        }
        return true;
    },

    verifyRequired(required, data={}) {
        let result = [];
        let entries = Object.entries(required);
        entries.forEach(([param, type]) => {
            if (typeof data[param] !== type) {
                result.push(`${param} must be ${type}`);
                return;
            };
            if (data[param] === null || data[param] === undefined || (typeof data[param] === "string" && data[param]?.trim() === "")) {
                result.push(`Missing ${param}`);
            };
        })

        if (result.length > 0) return result.join(", ");
        return "";
    },

    generateOTP () {
        return crypto.randomBytes(3).toString('hex');
    },

    genSessionID (userId) {
        return `${userId}_${crypto.randomBytes(32).toString('hex')}`;
    },

    genExpiredTime(min) {
        return new Date(Date.now() + min * 60 * 1000)
    },

    isValidDate (dateString) {
        // 1. Kiểm tra định dạng bằng Regex cơ bản
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx)) return false; 

        // 2. Dùng đối tượng Date để kiểm tra ngày đó có tồn tại thật không
        const d = new Date(dateString);
        const dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // Ngày không hợp lệ (NaN)
        
        // Kiểm tra xem Date có bị tự động nhảy ngày không (vd: 2024-02-30 thành 2024-03-01)
        return d.toISOString().slice(0,10) === dateString;
    },

    isValidDateTime (dateTimeString) {
        const date = new Date(dateTimeString);
        return !isNaN(date.getTime());
    },

    isImage (buffer) {
        const header = buffer.toString('hex').toUpperCase().substring(0, 8);
        const riff = buffer.toString('ascii', 0, 4);
        const webp = buffer.toString('ascii', 8, 12);

        let validHeader = ['89504E47', 'FFD8FFDB', 'FFD8FFEE', 'FFD8FFE0', 'FFD8FFE1', '47494638'];
        let isWebp = riff === 'RIFF' && webp === 'WEBP';
        let isImg = validHeader.includes(header) || isWebp;
        return isImg
    },

    isOnSizeLimit (size, limitMB) {
        return size <= limitMB * 1024 * 1024
    },

    responseFindMany (page, limit, totalRows, data) {
        const temp = {
            totalRows: totalRows,
            totalPages: Math.ceil(totalRows / limit),
            page: page,
            limit: limit,
            data: data,
        };
        if (!page) {
            delete temp.page;
        }
        return temp;
    }
};

export default commonHelper;