import { Component, OnInit } from '@angular/core';
import { Turista } from '../../model/turista';
import { TuristaService } from '../../services/turista.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-turista',
  templateUrl: './list-turista.component.html',
  styles: []
})
export class ListTuristaComponent implements OnInit {
  turistas: Turista[];

  constructor(private router: Router, private service: TuristaService) {}

  ngOnInit() {
    this.service.getTuristas().subscribe(data => (this.turistas = data));
  }

  deleteTurista(turista: Turista): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro desea eliminar al cliente ${turista.name} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.service.deleteTurista(turista.id).subscribe(data => {
          this.turistas = this.turistas.filter(c => c !== turista);
        });

        swal('Eliminado!', 'Se ha eliminado el cliente.', 'success');
      }
    });
  }

  editTurista(turista: Turista): void {
    localStorage.removeItem('editTuristaId');
    localStorage.setItem('editTuristaId', turista.id.toString());
    this.router.navigate(['edit-turista']);
  }

  addTurista(): void {
    this.router.navigate(['add-turista']);
  }
}
