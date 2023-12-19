import bcrypt from "bcrypt";

const saltRounds = 10;

export const passwordHash = (req, res, next) => {
	console.log("middleware", req.body.password);
	const { password } = req.body;

	if (password) {
		bcrypt.genSalt(saltRounds, (err, newSalt) => {
			if (err) {
				res.json({ msg: "error in genSalt" });
			} else {
				bcrypt.hash(password, newSalt, (err, hashedPassword) => {
					if (err) {
						res.json({ msg: `an error has occured`, err });
					} else {
						req.body.password = hashedPassword;
						next();
					}
				});
			}
		});
	} else {
		res.json({ msg: `the password is missing` });
	}
};
