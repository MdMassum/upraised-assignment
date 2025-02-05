"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfDestruct = exports.deleteGadget = exports.updateGadget = exports.createGadget = exports.getGadgets = void 0;
const gadgetService = __importStar(require("../services/gadgetService"));
// get gadgets -->
const getGadgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status;
    const gadgets = yield gadgetService.getGadgets(status);
    res.json(gadgets);
});
exports.getGadgets = getGadgets;
// create gadget -->
const createGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gadget = yield gadgetService.createGadget();
    res.status(201).json(gadget);
});
exports.createGadget = createGadget;
// update gadget -->
const updateGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const gadget = yield gadgetService.updateGadget(id, req.body);
    res.json(gadget);
});
exports.updateGadget = updateGadget;
// --> delete gadget
const deleteGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const gadget = yield gadgetService.decommissionGadget(id);
    res.json(gadget);
});
exports.deleteGadget = deleteGadget;
// self destruct -->
const selfDestruct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadgetService.triggerSelfDestruct();
    res.json(result);
});
exports.selfDestruct = selfDestruct;
