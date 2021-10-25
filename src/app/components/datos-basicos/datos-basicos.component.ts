/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

import { createAnimation } from '@ionic/angular';

import { ApiDataService } from 'src/app/services/api-data.service';
import { APIClientService } from 'src/app/services/apiclient.service';

@Component({
  selector: 'app-datos-basicos',
  templateUrl: './datos-basicos.component.html',
  styleUrls: ['./datos-basicos.component.scss'],
})
export class DatosBasicosComponent implements OnInit, AfterViewInit {
  @ViewChild('titulo3', { read: ElementRef, static: true }) titulo3: ElementRef;
  user: any;
  users: any;
  posts: any;
  post: any={
    id: null,
    us: "",
    pass: "",
    pass2: "",
    ap2materno:"",
    userId: null
  };
  compareWith: any;
  public ngOnInit() {}

  public ngAfterViewInit(): void {
    // eslint-disable-next-line prefer-const
    let animation = this.animationController
      .create()
      .addElement(this.titulo3.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translate(0px)', 'translate(100px)')
      .fromTo('opacity', 1, 0.2);
    animation.play();
  }



  constructor(
    private animationController: AnimationController,
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private api: APIClientService
  ) {}

  ionViewWillEnter(){
    this.getUsuarios();
    this.getPosts();
  }
  getUsuario(userId){
    this.api.getUsuario(userId).subscribe((data)=>{
      console.log(data)
      this.user=data;
    });
  }
  getUsuarios(){
    this.api.getUsuarios().subscribe((data)=>{
      this.users=data;
    });
  }
  getPosts(){
    this.api.getPosts().subscribe((data)=>{
      this.posts=data;
      this.posts.reverse();
    });
  }
  guardarPost(){
    if(this.post.userId==null){
      if(this.user===undefined){
        console.log("Seleccione un usuario");
        return;
      }
      this.post.userId=this.user.id;
      this.api.createPost(this.post).subscribe(
        ()=>{
          console.log("Creado Correctamente");
          this.getPosts();
        },
        error=>{
          console.log("Error "+error)
        }
      );
    }
    else{
      this.api.updatePost(this.post.id,this.post).subscribe(
        ()=>{
          console.log("Actualzado Correctamente");
          this.getPosts();
        },
        error=>{
          console.log("Error "+error)
        }
      );
    }
  }
  setPost(_post){
    this.post=_post;
    this.getUsuario(_post.userId);
    this.compareWith = this.compareWithFn;
  }
  eleminarPost(_post){
    console.log("eeliminar")
    this.api.deletePost(_post.id).subscribe(
      success=>{
        console.log("Eliminado correctamente");
        this.getPosts();
      },
      error=>{
        console.log("Error "+error)
      }
    )
  }
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.post)) {
      Object.defineProperty(this.post, key, { value: '' });
    }
  }
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
