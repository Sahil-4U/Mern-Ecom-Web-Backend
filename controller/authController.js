import { HashedPassword, comparePassword } from '../helper/authHelper.js';
import UserModel from '../model/UserModel.js';
import Jwt from 'jsonwebtoken';

// route for register-user:-
export const registerController = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password, phone, address, answer } = req.body;

        // validations
        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!email) {
            return res.send({ message: 'Email is required' });
        }
        if (!password) {
            return res.send({ message: 'Password is required' });
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' });
        }
        if (!address) {
            return res.send({ message: 'Address is required' });
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' });
        }
        // check User
        const exisitingUser = await UserModel.findOne({ email });
        // console.log(exisitingUser);
        // exisiting User
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: 'User already exist please login'
            })
        }
        //  validations are done now register the user in database
        const hashedPassword = await HashedPassword(password);
        // next create a new Object for model Schema
        const userObject = await new UserModel({ name, email, password: hashedPassword, phone, address, answer }).save();
        // console.log(userObject);
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

// route for login user:-
export const loginController = async (req, res) => {
    try {
        // destructuring
        const { email, password } = req.body;
        // validations
        if (!email || !password) {
            return res.status(401).send({
                status: unsuccessfull,
                message: 'Invalid Username or password',
            })
        }
        // get the details of this user from database
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                status: unsuccessfull,
                message: 'User not found'
            })
        }
        // now check password is same or not
        const comparepasswordDetails = await comparePassword(password, user.password);
        if (!comparepasswordDetails) {
            return res.status(401).send({
                success: "unsuccessfull",
                message: 'password not matched'
            })
        }
        // token creation
        const token = await Jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
        return res.status(200).send({
            success: true,
            message: 'login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }, token
        })
    } catch (error) {
        console.log(error);
        return res.status(403).send({
            status: unsuccessfull,
            message: 'Error in loginController function',
            error
        })
    }
}


// route for forget password:-
export const forgetController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body;
        //    validations
        if (!email) {
            return res.status(404).send({ message: 'Enter a valid email' });
        } else if (!answer) {
            return res.status(404).send({ message: 'Your answer is not valid' });
        } else if (!newpassword) {
            return res.status(404).send({ message: 'Provide new password please' });
        }

        // User checking
        const user = await UserModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not exist please register first'
            });
        }

        // now we need to update new password in db
        // first we hashed the password:-
        const hashedP = await HashedPassword(newpassword);

        await UserModel.findByIdAndUpdate(user._id, { password: hashedP });
        res.status(200).send({
            success: true,
            message: "new password updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Something went wrong'
        })
    }
}