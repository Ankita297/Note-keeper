const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("../backened/routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const notes=require('../backened/data/notes')
const notesRoutes=require('../backened/routes/notesRoutes')
const app = express();

dotenv.config();

connectDB();

app.use(express.json());


app.use("/api/users", userRoutes);
app.use('/api/notes',notesRoutes)


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App listening to port ${PORT}`));
