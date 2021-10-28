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
    if (this.db === null) {
      console.log('setDatabase BD fue asignada');
      this.db = db;
    }
  }
  /**
   * Crea las tablas necesarias para el funcionamiento
   */
  createTables(): Promise<any> {
    let tables = `
    console.log('createTables');
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
<<<<<<< HEAD

  /**
   * Retorna si existe un usuario activo o no.
   */
  sesionActive() {
    console.log('sesionActive');
=======
>>>>>>> 52d8f396c333c7c29b2b1b094a1ace3f4fab9b2f

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
<<<<<<< HEAD
  getSesionData(sesion: any) {
    console.log('getSesionData');

=======
  getSesionData(sesion: any){
>>>>>>> 52d8f396c333c7c29b2b1b094a1ace3f4fab9b2f
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
<<<<<<< HEAD
  createSesionData(sesion: any) {
    console.log('createSesionData');

    let sql = `INSERT INTO sesion_data(user_name,password,active)
    VALUES(?,?,?)`;
    return this.db
      .executeSql(sql, [sesion.Usuario, sesion.Password, sesion.Active])
      .then((response) => {
=======
  createSesionData(sesion: any){
    let sql = `INSERT INTO sesion_data(user_name,password,password2,segundo_apellido_materno,active)
    VALUES(?,?,?,?)`;
    return this.db.executeSql(sql, [sesion.Usuario,
      sesion.Password, sesion.Active]).then(response=>{
>>>>>>> 52d8f396c333c7c29b2b1b094a1ace3f4fab9b2f
        return Promise.resolve(response.rows.item(0));
      });;
  }
<<<<<<< HEAD
  updateSesionData(sesion: any) {
    console.log('updateSesionData');

=======
  updateSesionData(sesion: any){
>>>>>>> 52d8f396c333c7c29b2b1b094a1ace3f4fab9b2f
    let sql = `UPDATE sesion_data
    SET password=?, password2=?
    WHERE user_name=? and segundo_apellido_materno=?`;
    return this.db.executeSql(sql, [sesion.active,sesion.user_name]);
  }

}


