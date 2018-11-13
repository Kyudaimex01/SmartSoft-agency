import { Component, OnInit } from '@angular/core';
import { Rating } from '../../model/rating';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RatingService } from '../../services/rating.service';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import swal from 'sweetalert2';

import { Place } from '../../model/place';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styles: []
})
export class EditRatingComponent implements OnInit {

  rating: Rating;
  editForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private service: RatingService) { }

  ngOnInit() {

    const ratingId = localStorage.getItem('editRatingId');
    
    if ( !ratingId ) {
      alert('Acción invalida');
      this.router.navigate(['list-rating']);
      return;
    }
    
    this.editForm = this.formBuilder.group({
      idRat: [],
      locationRate: ['', Validators.required],
      priceRate: ['', Validators.required],
      serviceRate: ['', Validators.required],
      promRate: ['', Validators.required],
      comment: ['', Validators.required],
      postedBy: ['', Validators.required],
      ratedPlace: ['', Validators.required]
    });

    this.service.getRating(+ratingId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });

  }

  onSubmit() {
    this.service.updateRating(this.editForm.value)
      .pipe(first())
      .subscribe( data => {
        this.router.navigate(['list-rating']);
        swal({
          position: 'top',
          type: 'success',
          title: `Evaluacion modificada con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        alert(error);
      });
  }

}
