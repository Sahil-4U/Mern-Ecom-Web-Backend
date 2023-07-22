import { HashedPassword } from '../helper/authHelper.js';
import UserModel from '../model/UserModel.js';


export const registerController = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password, phone, address } = req.body;

        // validations
        if (!name) {
            return res.send({ error: "Name is required" });
        }
        if (!email) {
            return res.send({ error: 'Email is required' });
        }
        if (!password) {
            return res.send({ error: 'Password is required' });
        }
        if (!phone) {
            return res.send({ error: 'Phone is required' });
        }
        if (!address) {
            return res.send({ error: 'Address is required' });
        }
        // check User
        const exisitingUser = await UserModel.findOne({ email });
        // exisiting User
        if (exisitingUser) {
            return res.status(200).send({
                success: true,
                message: 'User already exist please login'
            })
        }
        //  validations are done now register the user in database
        const hashedPassword = await HashedPassword(password);
        // next create a new Object for model Schema
        const userObject = await new UserModel({ name, email, password: hashedPassword, phone, address }).save();
        console.log(userObject);
        return res.status(200).send({
            success: true,
            message: 'User is Registered  successfully on the database',
            user: userObject
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registerController',

        })
    }
};

