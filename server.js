import express from "express";
import rootRouter from "./src/routers/root.router.js";
import {ExceptionNotFound} from "./src/common/helpers/exception.helper.js";
import handleError from "./src/common/middleware/handleError.middleware.js";
import cors from "cors";

const app = express();
const PORT = 3579;

app.use(cors());
app.use(express.json());
app.use("/api", rootRouter);

app.use((req, res, next) => {
    const host = req.hostname;
    const url = req.originalUrl;
    const ip = req.ip;
    console.log({host, url, ip})
    throw new ExceptionNotFound("Not found!")
});

app.use(handleError)

app.listen(3579, () => {
    console.log("server online port", PORT)
});