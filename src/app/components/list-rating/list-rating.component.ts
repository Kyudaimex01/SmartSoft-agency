import { Component, OnInit } from '@angular/core';
import { Rating } from '../../model/rating';
import { RatingService } from '../../services/rating.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-rating',
  templateUrl: './list-rating.component.html',
  styles: []
})
export class ListRatingComponent implements OnInit {
  ratings: Rating[];

  constructor(private router: Router, private service: RatingService) {}

  ngOnInit() {
    this.service.getRatings().subscribe(data => (this.ratings = data));
  }

  deleteRating(rating: Rating): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro desea eliminar la evaluacion de ${rating.idRat}
      }?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.service.deleteRating(rating.idRat).subscribe(data => {
          this.ratings = this.ratings.filter(c => c !== rating);
        });

        swal('Eliminado!', 'Se ha eliminado la evaluacion.', 'success');
      }
    });
  }

  editRating(rating: Rating): void {
    localStorage.removeItem('editRatingId');
    localStorage.setItem('editRatingId', rating.idRat.toString());
    this.router.navigate(['edit-rating']);
  }

  addRating(): void {
    this.router.navigate(['add-rating']);
  }
}
