import { Component, Input, SimpleChanges, signal} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef : number | undefined;

  constructor(){
    // Antes de renderizar
    // Primero que se ejecuta
    // No asincrono, no debe tener cosas que requieren tiempo
    // Si se pueden declarar variables directas
    // solo se ejecuta una vez
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Antes y durante la renderización
    // Dice que cambios estan sucediendo con SimpleChanges
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const temp = changes['duration'];
    
    if (temp && temp.currentValue !== temp.previousValue){
      this.detectarCambio();
    }
  }

  ngOnInit() {
    // Despues de renderizar el componente
    // Solo corre una vez
    // Perfecto para cosas asincronas then, subscribe, fetch
    // Se puede demorar por la conexión.
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log(this.duration);
    console.log(this.message);

    // Ejemplo fuga de memoria
    this.counterRef = window.setInterval(() => {
      console.log('Delay.........');
      this.counter.update(statePrev => statePrev + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    // Despues de renderizar
    // Me avisa cuando los hijos de ese componente ya fueron renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    // Cuando se destruye el componente
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef); // Eliminar
  }

  detectarCambio() {
    // Ejecutar logica sincrona o asincrona
    console.log('Cambio en duration');
  }

}
