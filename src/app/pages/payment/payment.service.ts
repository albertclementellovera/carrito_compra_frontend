import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseDto } from 'src/app/purchase-dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  backendURL =  environment.backendUrl;

  constructor(private httpClient: HttpClient) { }

  public getToken(): Observable<any> {
    return this.httpClient.get<any>(this.backendURL + 'token');
  }

  public checkout(dto: PurchaseDto): Observable<any>{
    return this.httpClient.post<any>(this.backendURL + 'checkout',dto);
  }
}
