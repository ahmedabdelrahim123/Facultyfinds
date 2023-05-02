const express = require("express");
const app = express();
const PORT = process.env.PORT || 7008;
const studentRouter = require("./Routes/studentsRoutes");
const courseRouter = require("./Routes/coursesRoutes");
const bodyParser = require("body-parser");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
app.use("/api/student", studentRouter);

app.use("/api/course", courseRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
