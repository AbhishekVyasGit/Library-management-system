const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "library"

const register = async (req, res) => {

    try {
        const { title, name, phone, email, password, address } = req.body;

        // check input details 

        if (!(title && name && phone && email && password)) {
            return res.status(400).json({ message: "All input is required" });
        }

        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        // create user

        const user = await User.create(
            {
                title,
                name,
                phone,
                email: email.toLowerCase(),
                password: hashedPassword,
                address
            }
        );

        // create token

        const token = jwt.sign({ userId: user._id, email }, secretKey, { expiresIn: "12h" });

        return res.status(201).json({user: user, token: token});


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }


}



const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        // validate user input 

        if (!(email && password)) {
            return res.status(400).json({ message: "All input is required" });
        };

        const oldUser = await User.findOne({email});
        if (!oldUser) {
            return res.status(404).json({ message: "user is not exist, please register first" });
        };

        const matchedPassword = await bcrypt.compare(password, oldUser.password);
        if (!matchedPassword) {
            return res.status(400).json({ message: "password is not matched" });
        }

        const token = jwt.sign({ userId: oldUser._id, email }, secretKey);

        // console.log("token => ", token);

        return res.status(200).json({user: oldUser, token: token});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
}


module.exports = { register, login };