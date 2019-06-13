import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class APService {
    protected endpoint = 'https://advisingai.mominirfan.repl.co/courses/ap';
    protected httpOptions = {
	headers: new HttpHeaders({
	    'Content-Type': 'application/json',
	    'Authorization': 'johnlawrimore'
	})
    };

    constructor(protected http: HttpClient) { }

    getAPs(): Observable<string[]> {
	return this.http.get<string[]>(`${this.endpoint}`, this.httpOptions);
    }
}
