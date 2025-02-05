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
exports.triggerSelfDestruct = exports.decommissionGadget = exports.updateGadget = exports.createGadget = exports.getGadgets = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// For Generating random codename (e.g., "The Phoenix")
const generateCodename = () => {
    const adjectives = ['Silent', 'Golden', 'Iron', 'Shadow', 'Crimson'];
    const nouns = ['Phoenix', 'Eagle', 'Wolf', 'Storm', 'Viper'];
    return `The ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
};
// get gadgets service
const getGadgets = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const gadgets = yield prisma_1.default.gadget.findMany({
        where: status ? { status } : undefined,
    });
    return gadgets.map((gadget) => (Object.assign(Object.assign({}, gadget), { missionSuccessProbability: Math.floor(Math.random() * 100) })));
});
exports.getGadgets = getGadgets;
// creating gadget service
const createGadget = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.gadget.create({
        data: {
            name: generateCodename(),
        },
    });
});
exports.createGadget = createGadget;
// update gadget service
const updateGadget = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.gadget.update({
        where: { id },
        data,
    });
});
exports.updateGadget = updateGadget;
const decommissionGadget = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.gadget.update({
        where: { id },
        data: {
            status: 'Decommissioned',
            decommissionedAt: new Date(),
        },
    });
});
exports.decommissionGadget = decommissionGadget;
const triggerSelfDestruct = () => {
    return {
        confirmationCode: Math.random().toString(36).slice(2, 8).toUpperCase()
    };
};
exports.triggerSelfDestruct = triggerSelfDestruct;
