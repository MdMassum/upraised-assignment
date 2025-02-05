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
const signup = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
    if (existingUser)
        throw new Error('User already exists');
    const hashedPassword = yield (0, auth_1.hashPassword)(password);
    const user = yield prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    return user;
});
exports.signup = signup;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('User not found');
    const isValidPassword = yield (0, auth_1.comparePassword)(password, user.password);
    if (!isValidPassword)
        throw new Error('Invalid password');
    const token = (0, auth_1.generateToken)(user.id);
    return { user, token };
});
exports.login = login;
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return { message: 'Logged out successfully' };
});
exports.logout = logout;
