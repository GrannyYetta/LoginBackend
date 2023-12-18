import bcrypt from "bcrypt";

const saltRounds = 10;

export const passwordHash = (req, res, next) => {
	const { password } = req.body;

	if (password) {
		res.json({
			msg: `an error has occured and the password could not be hashed`,
		});
	} else {
		req.body.password = passwordHash;
		next();
	}
};
