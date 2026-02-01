import bcrypt from "bcrypt";
const bcryptHelper = {
    hashPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    checkPassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

export default bcryptHelper;