//TODO - importamos computed y signal
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonList, IonItem, IonLabel, IonButton, IonInput,
  ToastController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Elemento } from '../models/elemento.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
    IonList, IonItem, IonLabel, IonButton, IonInput,
    FormsModule
  ],
})
export class HomePage {
  // TODO
  // Signal: almacena el texto del campo de búsqueda.
  // Para leer su valor en el TS usamos this.busqueda()
  // Para modificarlo usamos this.busqueda.set('nuevo valor')
  busqueda = signal<string>('');

  // TODO
  // Signal: almacena la lista de elementos.
  // Al ser un signal, cualquier computed que lo use se recalculará automáticamente
  // cuando el array cambie (p.ej. si añadimos o eliminamos elementos).
  // elementos = Elemento[]
  elementos = signal<Elemento[]>([
    { id: 1, nombre: 'Angular', descripcion: 'Framework SPA de Google', categoria: 'Frontend' },
    { id: 2, nombre: 'Ionic', descripcion: 'Framework para apps híbridas', categoria: 'Mobile' },
    { id: 3, nombre: 'TypeScript', descripcion: 'Superset tipado de JavaScript', categoria: 'Lenguaje' },
    { id: 4, nombre: 'Node.js', descripcion: 'Entorno de ejecución de JS en servidor', categoria: 'Backend' },
    { id: 5, nombre: 'Capacitor', descripcion: 'Puente nativo para apps Ionic', categoria: 'Mobile' },
  ]);

  // TODO
  // Computed: se recalcula automáticamente cuando cambia el signal "elementos".
  // Equivale al getter anterior, pero Angular solo lo recalcula si su dependencia cambia.
  // Quitamos el método get hayElementos(): boolean
  hayElementos = computed<boolean>(() => this.elementos().length > 0);

  // TODO
  // Computed: depende de AMBOS signals (busqueda y elementos).
  // Cada vez que el usuario escribe en el input o cambia la lista,
  // Angular recalcula este valor de forma eficiente.
  // Quitamos el método get elementosFiltrados(): Elemento[]
  elementosFiltrados = computed<Elemento[]>(() => {
    const texto = this.busqueda().trim().toLowerCase();
    if (!texto) {
      return this.elementos();
    }
    //TODO modificar this.busqueda.toLowerCase por texto
    return this.elementos().filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  });

  private router = inject(Router);
  private toastController = inject(ToastController);
  constructor() {};

  // TODO (Apartado 2 – Navegación): Navegar a /detalle con el elemento seleccionado
  verDetalle(elementoHome: Elemento): void {
    // Pista: this.router.navigate(['/detalle'], { state: { elemento } });
    this.router.navigate(['/detalle'], { state: { elementoHome } });
  }

  // TODO (Apartado 1 + 3 – Event Binding): Mostrar un ion-toast al pulsar el botón
  async mostrarToast(): Promise<void> {
    // Consulta la teoría: apartado "ion-toast vs ion-alert"
    const toast = await this.toastController.create({
      message: 'Lista de tecnologías cargada correctamente',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
