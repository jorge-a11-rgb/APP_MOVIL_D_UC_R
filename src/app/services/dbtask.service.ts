/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DBTaskService {
  /**
   * Se declara una variable SQLiteObject y se inicializa en null
   * donde se guardara la instancia de SQLiteObject
   */
  db: SQLiteObject = null;

  constructor() {}
  /**
   * Permite guardar un objeto SQLiteObject
   * en la variable db
   */
  setDatabase(db: SQLiteObject) {
    alert('setDatabase');
    if (this.db === null) {
      this.db = db;
    }
  }
  /**
   * Crea las tablas necesarias para el funcionamiento
   */
  createTables(): Promise<any> {
    let tables = `
    alert('createTables');
    CREATE TABLE IF NOT EXISTS sesion_data
    (
      user_name TEXT PRIMARY KEY NOT NULL,
      password INTEGER NOT NULL,
      password2 INTEGER NOT NULL,
      segundo_apellido_materno NOT NULL,
      active INTEGER(1) NOT NULL
    );
    `;
    return this.db.executeSql(tables);
  }

  sesionActive(){
    // Se desarrolla la consulta
    let sql = `SELECT user_name,active FROM sesion_data WHERE active=1 LIMIT 1`;
    // Se ejecuta la consulta y no le pasamos parametros [value,value1,...]
    return this.db.executeSql(sql,[])
    // Cuando se ejecute la consulta
    .then(response=>{ // obtenemos lo que devuelve la consulta
      return Promise.resolve(response.rows.item(0)); // Se obtiene el primer item de la consulta y se retorna
    });
  }
  /*** Función que valida la existencia del usuario que esta iniciando sesión
   * @param sesion Datos de inicio de sesión Usuario y Password
   */
  getSesionData(sesion: any){
    let sql = `SELECT user_name, active FROM sesion_data
    WHERE user_name=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql,[sesion.Usuario,
      sesion.Password]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });
  }
  /*** Función que crea un nuevo registro de inicio de sesión
   * @param sesion Datos de inicio de sesión Usuario, Password y Active
   */
  createSesionData(sesion: any){
    let sql = `INSERT INTO sesion_data(user_name,password,password2,segundo_apellido_materno,active)
    VALUES(?,?,?,?)`;
    return this.db.executeSql(sql, [sesion.Usuario,
      sesion.Password, sesion.Active]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });;
  }
  updateSesionData(sesion: any){
    let sql = `UPDATE sesion_data
    SET active=?
    WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.active,sesion.user_name]);
  }

}


