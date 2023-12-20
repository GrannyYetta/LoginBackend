import jwt from "jsonwebtoken";
import 'dotenv/config.js'

export const jwtAuth = async (req, res, next) => {

    const token = req.cookies.jwtToken
	try {

        const verfiedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.userStatus = "authenticated"
        next()

	} catch (error) {
        res.clearCookie("jwtToken")
        res.json({msg: "access denied, token invalid"})
    }
};
