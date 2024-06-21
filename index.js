import express from "express";
import cors from "cors";
import hallBookingRouter from "./Routers/HallBookingRouter.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("App is running");
});

app.use("/api", hallBookingRouter);

app.get("/", (req, res) => {
  res.status(200).send("HallBooking API is running");
});
