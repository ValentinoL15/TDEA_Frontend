import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
  @if(isLoading$()){
    <div class="contenedor">
    <div class="hourglassBackground">
      <div class="hourglassContainer">
        <div class="hourglassCurves"></div>
        <div class="hourglassCapTop"></div>
        <div class="hourglassGlassTop"></div>
        <div class="hourglassSand"></div>
        <div class="hourglassSandStream"></div>
        <div class="hourglassCapBottom"></div>
        <div class="hourglassGlass"></div>
      </div>
    </div>
    </div>
  }
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent  implements OnInit {

  isLoading$ = this.spinnerService.isLoading$
  constructor(private readonly spinnerService: SpinnerService){

  }


  ngOnInit() {}

}
