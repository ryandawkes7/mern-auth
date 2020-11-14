const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const auth = require('../middleware/auth');

// Register Route
router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;

        // Validate data
        if(!email || !password || !passwordCheck)
            return res.status(400).json({msg: 'All fields required'});
        if (password.length < 6)
            return res.status(400).json({msg: 'Password must be more than 6 characters'});
        if(password !== passwordCheck)
            return res.status(400).json({msg: 'Passwords not matching'});

        // Searches DB for existing user email
        const existingUser = await User.findOne({email: email})

        // If email is already in DB, return error message
        if(existingUser)
            return res.status(400).json({msg: "Account with this email already exists"});

        // If no display name is entered, set display name as email
        if(!displayName) displayName = email;

        // Encrypt password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Defines new user model
        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        })

        // Sets saved user variable with response to frontend
        const savedUser = await newUser.save();
        res.json(savedUser);

        console.log(passwordHash);
        console.log("Email: " + email + ", Password: " + password + ", Password Check: " + passwordCheck + ", Display Name: " + displayName);

    } catch (err) {
        res.status(500).json({error: err.message});
    }


});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Form validation
        if(!email || !password) return res.status(400).json({ msg: 'All fields required' })

        // Find user account via their email
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ msg: 'Cannot find account from email' })

        // Checks if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ msg: "Invalid password" });
        // Generate token if user details are correct - ID is set to the JSON ID of the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Return user information upon successful login
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })


    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Delete Account Route
router.delete("/delete", auth, async (req, res) => {
    try {

        // Find user via ID and delete the user
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post("/tokenIsValid", async (req, res) => {
    try {
        // Verify User via Token
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);

        // Verify JWT
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);

        // Verify User exists in DB
        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        // User is validated
        return res.json(true);

    } catch(err) {
        res.status(500).json({ error: err.message })
    }
});

// Gets Logged In User
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    })
})

module.exports = router;
