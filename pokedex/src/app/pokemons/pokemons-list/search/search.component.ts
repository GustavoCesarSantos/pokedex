import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime }  from 'rxjs/operators';

@Component({
  selector: 'p-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  debounce: Subject<string> = new Subject<string>();
  @Output() onSearch = new EventEmitter<string>();
  @Input() textSearch: string = '';

  ngOnInit(): void{
    this.debounce.pipe(debounceTime(400)).subscribe(filter => {
      console.log(filter);
      this.onSearch.emit(filter)
    });
  };

  ngOnDestroy(): void{
    this.debounce.unsubscribe();
  };
};
