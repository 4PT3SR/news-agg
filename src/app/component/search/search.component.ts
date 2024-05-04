import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchedInput = new EventEmitter<string>();
  searchForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
      
    });
  }

  onSubmit() {
    const inputValue = this.searchForm.get('search')!.value
    if(inputValue){
      this.searchForm.get('search')?.reset();
      this.searchedInput.emit(inputValue)
    }
  }
}
