import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public IsLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    //Initialze the Observable:
    this.IsLoggedIn$ = authService.isLoggedIn(); 
  }

  ngOnInit(): void {
  }

  public logInWithGoogle(): void {
    this.authService.singInWithGoogle();
  }

  public singOut(): void {
    this.authService.singOut();
  }
}
