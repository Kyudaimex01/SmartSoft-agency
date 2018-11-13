import { Turista } from './../../model/turista';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TuristaService } from '../../services/turista.service';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-turista',
  templateUrl: './edit-turista.component.html',
  styles: []
})
export class EditTuristaComponent implements OnInit {

  customer: Turista;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: TuristaService) { }

  ngOnInit() {

    const turistaId = localStorage.getItem('editTuristaId');

    if ( !turistaId ) {
      alert('Acción invalida');
      this.router.navigate(['list-turista']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.service.getTurista(+turistaId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.service.updateTurista(this.editForm.value)
      .pipe(first())
      .subscribe( data => {
        this.router.navigate(['list-turista']);
        swal({
          position: 'top',
          type: 'success',
          title: `Cliente modificado con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        alert(error);
      });
  }

}
