import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-failure-pay',
  templateUrl: './failure-pay.page.html',
  styleUrls: ['./failure-pay.page.scss'],
})
export class FailurePayPage implements OnInit {

constructor() { }

ngOnInit() {
}

volver(){
  window.location.href = `/user/home`
}

}
