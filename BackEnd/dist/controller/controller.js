"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const mysqldb_1 = require("../db/mysqldb");
const instrumento_1 = __importDefault(require("../models/instrumento"));
exports.controller = {
    getInstrument: (req, res) => new Promise((resolve, reject) => {
        mysqldb_1.pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            console.log('MySQL Connection: ', connection.threadId);
            connection.query('SELECT * FROM instrumento limit 10', (err, results) => {
                if (err)
                    console.error(err);
                let instrumento = [];
                results.forEach((ins) => {
                    instrumento.push(JSON.parse(JSON.stringify(ins)));
                });
                connection.release();
                res.send(instrumento);
            });
        });
    }),
    getInstrumentById: (req, res) => new Promise((resolve, rejects) => {
        let empId = req.params.id;
        mysqldb_1.pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            console.log('MySQL Connection: ', connection.threadId);
            connection.query('SELECT * FROM instrumento WHERE id = ?', [empId], (err, results) => {
                if (err)
                    console.error(err);
                connection.release();
                console.log(empId);
                results = new instrumento_1.default(JSON.parse(JSON.stringify(results[0])));
                res.send(results);
            });
        });
    }),
    createInstrument: (req, res) => {
        const { apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body;
        var values = [apellido, nombre, dni, sector, fecha_ingreso, activo];
        console.log(values);
        mysqldb_1.pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            else {
                let sql = 'INSERT INTO employees (apellido, nombre, dni, sector, fecha_ingreso, activo) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        console.error(err);
                        res.json({ message: "Error al tratar de insertar" });
                    }
                    else {
                        res.json({ message: "Articulo Insertado con exito" });
                    }
                });
            }
        });
    },
    updateInstrument: (req, res) => {
        const { legajo, apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body;
        var values = [apellido, nombre, dni, sector, fecha_ingreso, activo, legajo];
        mysqldb_1.pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            else {
                let sql = 'UPDATE employees SET apellido=?, nombre=?, dni=?, sector=?, fecha_ingreso=?, activo=? WHERE legajo=?';
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        console.error(err);
                        res.json({ message: "Error al actualizar " + err });
                    }
                    else {
                        res.json({ message: "Articulo Actualizado con exito" });
                    }
                });
            }
        });
    },
    deleteInstrument: (req, res) => {
        let empId = req.params.id;
        mysqldb_1.pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            console.log('MySQL Connection: ', connection.threadId);
            connection.query('DELETE FROM employees WHERE legajo = ?', [empId], (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: 'Error al eliminar un empleado' });
                }
                else {
                    res.json({ message: 'Empleajo eliminado exitosamente' });
                }
            });
        });
    }
};
