import bcrypt from 'bcrypt';


export const HashedPassword = async (password) => {
    const saltRounds = 10;

    try {
        const hashedP = await bcrypt.hash(password, saltRounds);
        console.log('password is hashed now');
        return hashedP;
    } catch (error) {
        console.log(error);
    }
};


export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}