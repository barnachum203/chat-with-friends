import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.inteface';

@Injectable({
  providedIn: 'root',
})

/*
sing out  (with AngularFireAuth)
is logged in (with AngularFireAuth)
save user locally
*/
export class AuthService {
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDetails$: Subject<User> = new Subject<User>(); //We will use subject because we dont want to initial the value
  private usersURL = 'http://localhost:8000/api/user';

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private http:HttpClient
  ) {
    const savedUserString = localStorage.getItem('user');
    if(savedUserString != null){
      this.isLoggedIn$.next(true);
    }

    afAuth.authState.subscribe((user) => {
      if (user) {
        this.userDetails$.next(<User>user);
        const userString: string = JSON.stringify(user);
        localStorage.setItem('user', userString)
        localStorage.setItem('userId', user.uid)
        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('user');
        this.isLoggedIn$.next(false);
      }
    });
  }

  public singInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  private authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider).then((res) => {
      this.setUserData(res.user as User);
    });
  }

  private setUserData(user?: User): Promise<void> | void {
    if (!user) return;

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  public singOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userDetails$.next(undefined);
      this.router.navigate(['/']);
    });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  getUserDetails(id: string): Observable<User>{
    return this.http.get<User>(`${this.usersURL}/${id}`);
  }
}
