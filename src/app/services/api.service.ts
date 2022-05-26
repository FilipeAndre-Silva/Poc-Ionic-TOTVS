import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

const ACCESS_TOKEN_KEY = 'my-access-token';
const COMPANY_TOKEN_KEY = 'companyData';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url_order = environment.api_url_order;


  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // Load accessToken on startup
  async loadToken() {
    const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  // Sign in a user and store access and refres token
  login(credentials: { login, password, keepAlive: false }): Observable<any> {
    return this.http.post(`${this.url_order}/user/login`, credentials).pipe(
      switchMap((tokens: { authenticated, created, expiration, id, newPasswordToken }) => {
        console.log(tokens);
        this.currentAccessToken = tokens.newPasswordToken;
        const storeAccess = Storage.set({ key: ACCESS_TOKEN_KEY, value: tokens.newPasswordToken });
        return from(Promise.all([storeAccess]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  changecompany(idCompany): Observable<any> {
    return this.http.post(`${this.url_order}/user/changecompany?companyId=${idCompany}`, '').pipe(
      switchMap((tokens: { authenticated, created, expiration, id, newPasswordToken }) => {
        console.log(tokens);
        this.currentAccessToken = tokens.newPasswordToken;
        const storeAccess = Storage.set({ key: ACCESS_TOKEN_KEY, value: tokens.newPasswordToken });
        const companyData = Storage.set({ key: COMPANY_TOKEN_KEY, value: JSON.stringify(tokens) });
        return from(Promise.all([storeAccess, companyData]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  logout() {
    this.currentAccessToken = null;
    // Remove all stored tokens
    const deleteAccess = Storage.remove({ key: ACCESS_TOKEN_KEY });
    const deleteCompanyAccess = Storage.remove({ key: COMPANY_TOKEN_KEY });
    from(Promise.all([deleteAccess, deleteCompanyAccess]));
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  // Store a new access token
  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(Storage.set({ key: ACCESS_TOKEN_KEY, value: accessToken }));
  }

}