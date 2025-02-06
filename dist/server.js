"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const gadgetRoutes_1 = __importDefault(require("./routes/gadgetRoutes"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const PORT = process.env.PORT || 3000;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: '*',
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/', (req, res) => {
    res.json({
        message: "Server Up and Running"
    });
});
app.use('/api', gadgetRoutes_1.default);
app.use('/api/auth', authRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500)
        .json({ error: err.message || 'Internal Server Error' });
});
