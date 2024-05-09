import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private newUrl = "http://127.0.0.1:8000/reportes/reportenew";

  constructor(private http: HttpClient) { }

  /**
 * Sends a PUT request to the server to create a new report.
 *
 * @param data - The data to be sent in the request body. It should be an object that represents the report details.
 * @returns An Observable that emits the server response. The response will be of type `any`.
 *
 * @throws Will throw an error if the server returns a status code outside the 200-299 range.
 *
 * @remarks
 * This method uses the `HttpClient` module from `@angular/common/http` to send the request.
 * The request body is JSON-stringified using `JSON.stringify`.
 *
 * @example
 * ```typescript
 * const reportData = {
 *   title: 'My Report',
 *   content: 'This is the content of my report.',
 *   //... other report properties
 * };
 *
 * reportesService.newReporte(reportData).subscribe(
 *   (response) => {
 *     console.log('Report created successfully:', response);
 *   },
 *   (error) => {
 *     console.error('Error creating report:', error);
 *   }
 * );
 * ```
 */
newReporte(data: any): Observable<any> {
  let jsonData = JSON.stringify(data);
  return this.http.put<any>(this.newUrl, jsonData);
}
}
