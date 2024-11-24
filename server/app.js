require("dotenv").config();
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

// Middleware
app.use("/api", require("./routes/index"));

const server = http.createServer(app);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

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
