
import  {Component, inject} from '@angular/core';
import { Estudiante } from './models/estudiante';
//nuevas importaciones:
import { FormsModule } from '@angular/forms';
import { EstudianteService } from './services/estudiantes';

@Component ({
  selector: 'app-root',
  imports: [FormsModule],//añadimos el formsModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  titulo : string = "Sistemas de Gestion Academica";
  //modificamos todo el codigo que estaba acá
private estudianteService = inject(EstudianteService);
  estudiantes = this.estudianteService.obtenerEstudiantes();
  
  nuevoEstudiante: Estudiante = { id: 0, nombre: '', correo: '', carrera: '', telefono: '' };

  //id del estudiante que se está editando (null = ninguno)
  editando: number | null = null;

  guardarEstudiante() {
    if (this.nuevoEstudiante.id === 0) {
      this.estudianteService.agregarEstudiante({ ...this.nuevoEstudiante });
    } else {
      this.estudianteService.actualizarEstudiante(this.nuevoEstudiante);
    }
    this.limpiarFormulario();
  }

  seleccionarParaEditar(estudiante: Estudiante) {
    this.nuevoEstudiante = { ...estudiante };
    this.editando = estudiante.id; //marca cuál se está editando
  }

  eliminar(id: number) {
    this.estudianteService.eliminarEstudiante(id);

    //si eliminas el que estabas editando, limpia formulario y resaltado
    if (this.editando === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.nuevoEstudiante = { id: 0, nombre: '', correo: '', carrera: '', telefono: '' };
    this.editando = null; //apaga el resaltado
  }
}
