/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { Usuario_pass } from 'src/app/model/Usuario_pass';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';

import { createAnimation } from '@ionic/angular';
import { Animation } from '@ionic/angular';
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */

import { AnimationController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { pass } from 'src/app/model/pass';
import { Session } from 'selenium-webdriver';
import { Usuario } from 'src/app/model/Usuario';
import { DBTaskService } from 'src/app/services/dbtask.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit, AfterViewInit {
  @ViewChild('titulo3', { read: ElementRef, static: true }) titulo3: ElementRef;
  @ViewChild('ti4', { read: ElementRef, static: true }) ti4: ElementRef;
  @ViewChild('ti5', { read: ElementRef, static: true }) ti5: ElementRef;
  @ViewChild('ti6', { read: ElementRef, static: true }) ti6: ElementRef;
  @ViewChild('ti7', { read: ElementRef, static: true }) ti7: ElementRef;

  sesion = {
    user_name: '',
    password: '',
    password2: '',
    segundo_apellido_materno:''
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private activeroute: ActivatedRoute,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {}

  public ngAfterViewInit(): void {
    // eslint-disable-next-line prefer-const
    let animation = this.animationController
      .create()
      .addElement(this.titulo3.nativeElement)
      .addElement(this.ti4.nativeElement)
      .addElement(this.ti5.nativeElement)
      .addElement(this.ti6.nativeElement)
      .addElement(this.ti7.nativeElement)
      .duration(4000)

      .fromTo('opacity', 0.1, 5);

    document.querySelector('#limpiar2').addEventListener('click', () => {
      animation.play();
    });
  }

  public ngOnInit(): void {}

  public Restableser(): void {
    if (this.sesion.user_name.trim() === '') {
      this.mostrarMensaje('Debe ingresar su usuario');
    }
    if (this.sesion.password !== this.sesion.password2) {
      this.mostrarMensaje('Debe escribir las claves de manera igual');
    }
    if(this.sesion.segundo_apellido_materno.trim()===''){
      this.mostrarMensaje('Debe ingresar el segundo apellido de su madre');

    }
    if (this.sesion.password === '') {
      this.mostrarMensaje('Debe ingresar una clave');
    }
    if (this.sesion.password2 === '') {
      this.mostrarMensaje('Debe repetir la clave');
    } else {
      updateSesionData(this.sesion);
      this.mostrarMensaje('Clave actualizada');
    }
  }
  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.sesion)) {
      Object.defineProperty(this.sesion, key, { value: '' });
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }
}

function updateSesionData(sesion: {
  user_name: string;
  password: string;
  password2: string;
}) {
  throw new Error('Function not implemented.');
}
