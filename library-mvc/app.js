const express = require("express")
const app = express();
require("./configs/db");
const userController = require("./routes/user-routes");
const bookController = require("./routes/book-routes");
const bookReviewController = require("./routes/review-routes");
const PORT = process.env.PORT || 6000;

app.use(express.json());


app.use("/", userController);
app.use("/", bookController);
app.use("/", bookReviewController);



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));