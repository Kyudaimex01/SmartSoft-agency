import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingService } from '../../services/rating.service';
import swal from 'sweetalert2';

import { Place } from '../../model/place';
import { PlaceService } from '../../services/place.service';
import { Turista } from '../../model/turista';
import { TuristaService } from '../../services/turista.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styles: []
})
export class AddRatingComponent implements OnInit {
  places: Place[];
  turistas: Turista[];

  constructor(private formBuilder: FormBuilder, private router: Router, private service: RatingService, private servicep: PlaceService, private servicet: TuristaService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.servicep.getPlaces().subscribe(data => (this.places = data));
    this.servicet.getTuristas().subscribe(data => (this.turistas = data));
    this.addForm = this.formBuilder.group({
      idRat: [],
      locationRate: ['', Validators.required],
      priceRate: ['', Validators.required],
      serviceRate: ['', Validators.required],
      promRate: ['', Validators.required],
      comment: ['', Validators.required],
      postedBy: ['', Validators.required],
      ratedPlace: ['', Validators.required]
    });
  }

  onSubmit() {
    this.service.createRating( this.addForm.value )
      .subscribe(data => {
        this.router.navigate(['list-rating']);
        swal({
          position: 'top',
          type: 'success',
          title: `Evaluacion creada con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}
