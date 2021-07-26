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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database = require('../database');
const router = express_1.Router();
class User_Controller {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, clave, nombre, apellido, correo, telefono, fotografia, genero, fecha_nacimiento, direccion, estado, tipo, credito, ganancia } = req.body;
            let sql = "insert into usuario(username,clave,nombre,apellido,correo,telefono,fotografia,genero,fecha_nacimiento,direccion,estado,tipo,credito,ganancia) values(:username,:clave,:nombre,:apellido,:correo,:telefono,:fotografia,:genero,TO_DATE(:fecha_nacimiento,'YYYY-MM-DD'),:direccion,:estado,:tipo,:credito,:ganancia)";
            yield database.Open(sql, [username, clave, nombre, apellido, correo, telefono, fotografia, genero, fecha_nacimiento, direccion, estado, tipo, credito, ganancia], { autoCommit: true });
            res.status(200).json({ msg: "se creo" });
        });
    }
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "select * from usuario";
            let result = yield database.Open(sql, [], { autoCommit: false });
            console.log(result);
            res.json(result);
            /*let User:Array<games> = []
            l//et user:games[];
            result.rows.map((let user:games[])=>{
    
            })*/
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username, clave, nombre, apellido, correo, telefono, fotografia, genero, fecha_nacimiento, direccion, estado, tipo, credito, ganancia } = req.body;
            let sql = "update usuario set username=:username where id=:id";
            let result = yield database.Open(sql, [username, clave, nombre, apellido, correo, telefono, fotografia, genero, fecha_nacimiento, direccion, estado, tipo, credito, ganancia], { autoCommit: true });
            res.status(200).json({ msg: "todo okey" });
        });
    }
    activar(req, re) {
        return __awaiter(this, void 0, void 0, function* () {
            let usua = req.body.username;
            let sql = "select *from usuario where username = " + usua;
            let result = yield database.Open(sql, [], { autoCommit: false });
            if (result.rows[0].lengt > 0) {
                if (result.rows[0].clave == req.body.clave) {
                    let sql2 = "update usuario set estado = 1 where username=" + usua;
                    let result2 = yield database.Open(sql2, [], { autoCommit: true });
                    result2.status(200).json({ response: "activado" });
                }
                else {
                    result.status(500).json({ Error: "malo" });
                }
            }
        });
    }
}
const userController = new User_Controller();
exports.default = userController;
