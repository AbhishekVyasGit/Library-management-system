const express = require("express")
const app = express();
require("./configs/db");
const userRoutes = require("./routes/user-routes");
const bookRoutes = require("./routes/book-routes");
const bookReviewRoutes = require("./routes/review-routes");
const PORT = process.env.PORT || 6000;

app.use(express.json());


app.use("/", userRoutes);
app.use("/", bookRoutes);
app.use("/", bookReviewRoutes);



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));