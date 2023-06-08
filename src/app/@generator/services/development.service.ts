import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIS } from "src/app/config/driver.apis";

@Injectable({
    providedIn: 'root'
  })
  export class DevelpmentService {
    
    constructor(private http: HttpClient) { }
    storeLayers(layers: any){
        return this.http.post(APIS.storeLayers, {...layers});
    }
    getLayers(project) {
        return this.http.get(APIS.getLayers);
    }
  } 