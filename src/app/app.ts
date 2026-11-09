
import { Component, inject } from '@angular/core';
import { Estudiante } from './models/estudiante';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from './services/estudiantes';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo: string = "Sistemas de Gestion Academica";

  private estudianteService = inject(EstudianteService);
  estudiantes = this.estudianteService.obtenerEstudiantes();

  // MODIFICACIÓN 5: Variable del buscador
  textoBusqueda: string = '';

  nuevoEstudiante: Estudiante = {
    id: 0, nombre: '', correo: '', carrera: '', telefono: ''
  };

  // MODIFICACIÓN 5: Filtrar estudiantes
  filtrarEstudiantes(): Estudiante[] {
    return this.estudiantes.filter(estudiante =>
      estudiante.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
      estudiante.correo.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
      estudiante.carrera.toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
  }

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
<<<<<<< HEAD
    this.nuevoEstudiante = { id: 0, nombre: '', correo: '', carrera: '', telefono: '' };
    this.editando = null; //apaga el resaltado
=======
    this.nuevoEstudiante = {
      id: 0, nombre: '', correo: '', carrera: '', telefono: ''
    };
>>>>>>> 9be1b37 (Modificacion 5: Buscador de estudiantes)
  }
}
