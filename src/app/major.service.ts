import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MajorService {
    protected endpoint = 'https://advisingai.mominirfan.repl.co/majors/all';
    protected httpOptions = {
	headers: new HttpHeaders({
	    'Content-Type': 'application/json',
	    'Authorization': 'johnlawrimore'
	})
    };
    constructor(private http: HttpClient) { }

    getMajors(): Observable<string[]> {
	return this.http.get<string[]>(`${this.endpoint}`, this.httpOptions);
    }
}
