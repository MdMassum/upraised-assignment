"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const auth_1 = require("../utils/auth");
// user signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json('Email or Password cannot be empty');
            return;
        }
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json("User already exists");
            return;
        }
        const hashedPassword = yield (0, auth_1.hashPassword)(password);
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.signup = signup;
// user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json('Email or Password cannot be empty');
            return;
        }
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        const isValidPassword = yield (0, auth_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            res.status(401).json("Invalid Credentials");
            return;
        }
        const token = (0, auth_1.generateToken)(user.id);
        // Set token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour expiration
        });
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
// user logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).json("Logout Successfully");
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.logout = logout;
