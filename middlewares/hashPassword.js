import bcrypt from "bcrypt";

const saltRounds = 10;

export const passwordHash = (req, res, next) => {
	console.log("middleware", req.body.password);
	const { password } = req.body;

	if (password) {
		bcrypt.hash(password, saltRounds, (err, passwordHash) => {
			if (err) {
				res.json({ msg: "Something went wrong with password hashing" });
			} else {
				req.body.password = passwordHash;
			}
		});
	}
};
