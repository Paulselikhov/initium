import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
	providedIn: 'root',
})
export class ClientService {

	constructor(
		private httpClient: HttpClient,
	){}

  	getClients(): Observable<any> { 
	return this.httpClient.get<any>('https://test-data.directorix.cloud/task1')
		.pipe(
			map( res => res.users.map( (i:any) => {
				return {
					...i,
					id: Math.floor(Math.random() * 99999999) + 1,
					selected: false
				}
			}))
		)
	}
}
