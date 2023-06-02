import { User } from "../models/user";


/**
 * 
 * @param {User} user 
 */
export const userModelToLocalHost = (user) => {
    const {
        avatar,
        balance,
        firstName,
        geneder,
        id,
        isActive,
        lastName,
    } = user;
    return {
        avatar,
        balance,
        first_name: firstName,
        geneder,
        id,
        isActive,
        last_name: lastName,
    };
}