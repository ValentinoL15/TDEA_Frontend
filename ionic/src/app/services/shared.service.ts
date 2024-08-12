import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private isTeamSubject = new BehaviorSubject<boolean>(false);
  isTeam$ = this.isTeamSubject.asObservable();
  setIsTeam(value: boolean) {
    this.isTeamSubject.next(value);
  }

  private newTeamSubject = new BehaviorSubject<any[]>([]);
  newTeam$ = this.newTeamSubject.asObservable();
  setNewTeam(value: any[]) {
    this.newTeamSubject.next(value);
  }


}
