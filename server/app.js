require("dotenv").config();
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();
app.use(express.json());

// Middleware
app.use("/api", require("./routes/index"));
const server = http.createServer(app);
app.use(errorMiddleware);

const PORT = process.env.PORT || 6000;

const bootstrap = async () => {
	try {
		await mongoose
			.connect(process.env.MONGO_URI)
			.then(() => console.log("Mongodb connected"));
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
	} catch (error) {
		console.error(error);
	}
};

bootstrap();

server.on("error", (error) => {
	if (error.syscal !== "listen") {
		throw error;
	}
	switch (error.code) {
		case "EACCES":
			console.error(`Port ${PORT} requires elevated privileges.`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.log(`Port ${PORT} is already in use.`);
			process.exit(1);
			break;
		default:
			throw error;
	}
});
