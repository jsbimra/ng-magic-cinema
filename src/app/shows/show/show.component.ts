import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema.service';
import { HypenTransformPipe } from 'src/app/hypen-transform.pipe';
import { Show } from 'src/app/shared/show.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass'],
  providers: [HypenTransformPipe]
})
export class ShowComponent implements OnInit {
  selectedShowName: string = '';
  selectedShow: Show;
  defaultSeats: any;

  constructor(private route: ActivatedRoute, private cinemaService: CinemaService, 
    private hypenTransform: HypenTransformPipe) {

    this.selectedShowName = this.route.snapshot.paramMap.get('id');
    this.defaultSeats = this.cinemaService.getDefaultSeats();

    console.log(this.defaultSeats.platinum);
  }

  ngOnInit() {  
    // console.log(this.selectedShow, this.hypenTransform.transform(this.selectedShow, 'remove'));

    const transformShowName = this.hypenTransform.transform(this.selectedShowName, 'remove');

    this.selectedShow = this.cinemaService.getShowDetails(transformShowName);

    console.log(this.selectedShow);
  }

}
