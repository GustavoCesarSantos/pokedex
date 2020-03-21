import { Injectable } from "@angular/core";

const LVL = 'lvl';

@Injectable()
export class LevelService {
  getLevel(){
    return window.localStorage.getItem(LVL);
  }

  setLevel(level){
    window.localStorage.setItem(LVL, level);
  }

  removeLevel(){
    window.localStorage.removeItem(LVL);
  }
}