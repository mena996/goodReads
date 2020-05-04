const UserModel = require('../models/users');
const RefreshTokens = require('../models/refreshTokens');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logIn = async (req, res) => {
    const { body: { username, password } } = req;
    const user = await UserModel.findOne({username});
    if (!user) return res.status(400).send("Can't find a user with this username");
    try {
        if (await bcrypt.compare(password,user.password)){
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            await RefreshTokens.create({ token: refreshToken })
            res.json({accessToken, refreshToken});
        }else{
            res.send("wrong username/password combination");
        }
    } catch {
        res.status(500).send();
    }
}

const generateAccessToken = (user) => {
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m'});
}

const generateRefreshToken = (user) => {
    return jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30m'});
}

const regenerateAccessToken = async (req, res) => {
    const { body: { refreshToken } } = req;
    if (!refreshToken) return res.status(401).send()
    const token = await RefreshTokens.findOne({token: refreshToken});
    if (!token) return res.status(403).send();
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send()
        const accessToken = generateAccessToken(user)
        res.json({ accessToken })
    })
}

const authenticateToken = (req,res,next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const {body:{token}} = req
    if (!token) return res.status(401).send();
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send();
        req.user = user;
        // res.json(user)
        next(user);
    })
}

const logOut = async (req, res) => {
    const {body:{refreshToken}} = req
    try{
        const token = await RefreshTokens.findOneAndDelete({token: refreshToken});
        if (!token) return res.status(402).send("Token not found");
        res.sendStatus(204)
    }catch{
        res.sendStatus(500)
    }
}







module.exports = {
	logIn,
    regenerateAccessToken,
    logOut,
}