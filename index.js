import express from "express";
import userRouter from "./routes/userRoutes.js";
import { connection } from "./db.js";

const app = express();
const PORT = 3000 || 8000;

connection();
//app.use(bodyParser.json());
app.use(express.json());

app.get("/home", (req, res) => {
	res.json({ msg: "home" });
});
//router
app.use("/api/user", userRouter);

app.listen(PORT, () => {
	console.log(`server is running on http://localhost:${PORT}`);
});
