"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
class User_Routes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/mostrar', UserController_1.default.obtener);
        this.router.post('/add', UserController_1.default.create);
        this.router.put('/activar', UserController_1.default.activar);
        /*this.router.post('/in',userController.loguear);
        this.router.get('mostrarUno:username',userController.obtener);
        this.router.put('/actualizar',userController.actualizar);*/
    }
}
const userRoutes = new User_Routes();
exports.default = userRoutes.router;
