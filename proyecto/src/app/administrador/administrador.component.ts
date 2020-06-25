import { Component, OnInit } from '@angular/core';
import { AdministradorService } from "./administrador.service";
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  config_plato = {};

  config_vista_plato: String = 'menu_principal';

  display_components: String = 'menu';

  private notifier: NotifierService;

  constructor(private service: AdministradorService, notifier: NotifierService) { this.notifier = notifier }


  ngOnInit(): void {
    // listado de platos disponibles
    this.service.Listado_Platos().subscribe((data: any) => {
      if (data.estado === 'success') {

        this.config_plato = {
          event: 'listado_platos',
          platos: data.plato,
        }

      } else if (data.estado === 'error') {
        this.notifier.notify("error", "Ha ocurrido un error al traer los platos disponibles", data);
      }
    });

    // listado de platos no disponibles
    this.service.Listado_no_Dispopnibles().subscribe((data: any) => {
      if (data.estado === 'success') {
        this.config_plato = {
          event: 'platos_no_disponibles',
          platos: data.plato,
        }

      } else if (data.estado === 'error') {
        this.notifier.notify("error", "Ha ocurrido un error al traer los platos no disponibles", data);
      }
    });
  }


  events_menu(e) {
    console.log("entro en el evento del menu", e.event);
    switch (e.event) {
      case 'menu':
        this.service.Listado_Platos().subscribe((data: any) => {
          if (data.estado === 'success') {
            this.config_plato = {
              event: 'listado_platos',
              platos: data.plato,
            }
          } else if (data.estado0 === 'error') {
            this.notifier.notify("error", "Ha ocurrido un error al traer los platos disponibles", data);
          }
        });

        // listado de platos no disponibles
        this.service.Listado_no_Dispopnibles().subscribe((data: any) => {
          if (data.estado === 'success') {
            this.config_plato = {
              event: 'platos_no_disponibles',
              platos: data.plato,
            }

          } else if (data.estado === 'error') {
            this.notifier.notify("error", "Ha ocurrido un error al traer los platos no disponibles", data);
          }
        });

        this.display_components = e.event;
        this.config_vista_plato = 'menu_principal';
        break;

      case 'mesas':
        this.display_components = e.event;

        break;

      case 'pedidos':
        this.display_components = e.event;

        break;

      case 'cerrar':
        localStorage.setItem("id_usuario", "null");
        break;
    }
  }

  events_plato(e) {
    switch (e.event) {

      case 'crear_plato':

        this.service.Crear_Platos(e.data).subscribe((data: any) => {
          if (data.estado === 'success') {
            this.notifier.notify("success", "Plato creado satisfactoriamente");
            console.log("datos del plato ", data);

            this.config_plato = {
              event: 'crear_plato',
              data: data
            }
          }
          else if (data.estado === 'error') {
            this.notifier.notify("error", "Error al crear el plato");
            console.log("datos del plato ", data);
          }
        });
        break;

      case 'agregar_categoria':
        for (let i = 0; i < e.ciclo.length; i++) {
          let data = {
            id_plato: e.id_plato,
            id_categoria: e.ciclo[i]
          }
          console.log("datos que manda para la peticion de añadir categorias al plato", data);
          this.service.Agregar_Categorias_Plato(data).subscribe((data: any) => {
            console.log("datos que se muestran ", data);

            if (i == e.ciclo.length - 1) {
              this.notifier.notify("success", "se ha añadido todas las categorias al plato");
              this.config_plato = {
                event: 'agregado_plato'
              }
            }
          });
        }

      break;

      case 'categorias_plato':
        
      
      break;

      case 'modificar_plato':
        this.service.Modificar_platos(e.data).subscribe((data:any)=>{
          if (data.estado === 'success') {
            this.notifier.notify("success", "Plato modificado satisfactoriamente");
            console.log("datos de la modificacion del plato ", data);
            this.config_plato = {
              event: 'modificar_plato' 
            }
          }
          else if (data.estado === 'error') {
            this.notifier.notify("error", "Error al modirficar el plato");
            console.log("datos de la modificacion del plato", data);
          }
        }) 
      break;

      case 'mensaje':
        this.notifier.notify(e.tipo, e.mensaje);
        break;
    }
  }
}
