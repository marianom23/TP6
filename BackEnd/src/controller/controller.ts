import { Request, Response } from "express"
import  { pool }  from "../db/mysqldb"
import Instrumento from "../models/instrumento"

export let controller = {
    getInstrument: (req: Request, res: Response) => new Promise ((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if(err){
                console.log(err)
                res.send(err)
                return;
            }
            console.log('MySQL Connection: ', connection.threadId);
            connection.query('SELECT * FROM instrumento limit 10', (err: any, results: any) => {
                if (err) console.error(err);
                let instrumento: Instrumento[] = [] 
                results.forEach((ins: any) => {
                    instrumento.push(JSON.parse(JSON.stringify(ins)))
                });
                connection.release()
                res.send(instrumento)
            });
        })
    })
    ,
    getInstrumentById: (req: Request, res: Response) => new Promise ((resolve, rejects) => {
        let empId = req.params.id
        pool.getConnection((err: any, connection: any) => {
            if(err){
                console.log(err)
                res.send(err)
                return;
            }
            console.log('MySQL Connection: ', connection.threadId);
            connection.query('SELECT * FROM instrumento WHERE id = ?', [empId], (err: any, results: any) => {
                if (err) console.error(err);
                connection.release()
                console.log(empId)
                
                results = new Instrumento(JSON.parse(JSON.stringify(results[0])))
                
                res.send(results)
            });
        })
    })   
    ,
    createInstrument: (req: Request, res: Response) => {
        const {apellido, nombre, dni, sector, fecha_ingreso, activo} = req.body;
        var values = [apellido, nombre, dni, sector, fecha_ingreso, activo];
        console.log(values)
        pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else{
            let sql:string = 'INSERT INTO employees (apellido, nombre, dni, sector, fecha_ingreso, activo) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(sql, values, (err: any, results: any) => {
                if (err) {
                  console.error(err);
                  res.json({message:"Error al tratar de insertar"})
                }else{
                  res.json({message:"Articulo Insertado con exito"})
                }
            });
        }          
      });
    },
    updateInstrument: (req: Request, res: Response) => {
        const {legajo, apellido, nombre, dni, sector, fecha_ingreso, activo} = req.body;
        var values = [ apellido, nombre, dni, sector, fecha_ingreso, activo, legajo];
        pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else{
            let sql:string = 'UPDATE employees SET apellido=?, nombre=?, dni=?, sector=?, fecha_ingreso=?, activo=? WHERE legajo=?';
            connection.query(sql, values, (err:any, results:any) => {
                if (err) {
                  console.error(err);
                  res.json({message:"Error al actualizar " + err})
                }else{
                  res.json({message:"Articulo Actualizado con exito"})
                }
               
            });
        }          
        });
    },
    deleteInstrument: (req: Request, res: Response) => {
        let empId = req.params.id
        pool.getConnection((err: any, connection: any) => {
            if(err){
                console.log(err)
                res.send(err)
                return;
            }
            console.log('MySQL Connection: ', connection.threadId);
            connection.query('DELETE FROM employees WHERE legajo = ?', [empId], (err: any, results: any) => {
                if (err) {
                    console.error(err);
                    res.json({message: 'Error al eliminar un empleado'})
                }else {
                    res.json({message: 'Empleajo eliminado exitosamente'})
                }
            });
        })
    }
}
