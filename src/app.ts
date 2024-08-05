import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRoute from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/books", bookRoutes);

app.use(globalErrorHandler);

export default app;
