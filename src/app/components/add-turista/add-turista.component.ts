import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuristaService } from '../../services/turista.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-turista',
  templateUrl: './add-turista.component.html',
  styles: []
})
export class AddTuristaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: TuristaService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    this.service.createTurista( this.addForm.value )
      .subscribe(data => {
        this.router.navigate(['list-turista']);
        swal({
          position: 'top',
          type: 'success',
          title: `Cliente creado con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}
