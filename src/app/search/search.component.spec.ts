import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule, HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty searchQuery and showZeroStateMessage as false', () => {
    expect(component.searchQuery).toEqual('');
    expect(component.showZeroStateMessage).toBeFalse();
  });

  it('should update searchQuery when input value changes', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'testUser';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchQuery).toEqual('testUser');
  });

  it('should call searchUser method when Search button is clicked', () => {
    spyOn(component, 'searchUser');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(component.searchUser).toHaveBeenCalled();
  });
});
