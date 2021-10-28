/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/naming-convention */
export class Usuario {
  public id= 0;
  public User_name = '';
  public Password = '';
  public password2 ='';
public Segundo_apellido_materno= '';

  public active = 1;
  validar: any;
  public validarNombreUsuario(): string {
    if (this.User_name.trim() === '') {
      return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
    }
    if (this.User_name.trim() !== 'Jorge12') {
      return 'El nombre de usuario es incorrecto';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.User_name.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña';
    }
    for(let i = 0; i < this.Password.length; i++) {
      if ('0123456789'.indexOf(this.Password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica';
      }
    }
    if (this.Password.trim() !== '1234') {
      return 'La contraseña es incorrecta';
    }
    if(this.password2.trim() !== this.Password.trim()){
      return 'Las claves deben ser iguales';
    }
  }

  public validarUsuario(): string {
    return this.validarNombreUsuario()
      || this.validarPassword();
  }
}
