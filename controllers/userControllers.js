import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const userRegistraiton = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	const generateUserName =
		firstname + lastname + Math.floor(Math.random() * 50);
	try {
		const user = await userModel.create({
			firstname: firstname,
			lastname: lastname,
			username: generateUserName,
			email: email,
			password: password,
		});
		res.json({
			msg: `Hi! You have successfully created a user named ${generateUserName}. Now make sure to login and enjoy our services.`,
			user: user.username,
		});
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

export const userLogin = async (req, res) => {
	const { identifier, password } = req.body;

	try {
		const queryString = identifier.includes("@")
			? { email: identifier }
			: { username: identifier };

		const user = await userModel.findOne(queryString);

		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				console.log(result);

				if (result) {
					res.json({ msg: `login successful`, user });
				} else {
					res.json({ msg: `this password is wrong`, err });
				}
			});
		} else {
			res.send(
				"This user is not in our database. Please create a user to proceed."
			);
		}
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

export const userUpdate = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await userModel.updateOne(req.body);
		res.json({ msg: `${user} has been successfully updated` });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

export const userDeletetion = async (req, res) => {
	const { id } = req.query;

	try {
		const user = userModel.findByIdAndDelete(id);
		res.json({ msg: `${user.firstname} hast been successfully deleted` });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
