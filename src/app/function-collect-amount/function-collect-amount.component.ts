import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-function-collect-amount',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './function-collect-amount.component.html',
  styleUrls: ['./function-collect-amount.component.css']
})
export class FunctionCollectionComponent {
  name: string = '';
  place: string = '';
  amount: number = 0;
  dataLabel: string = '';
  showGif: boolean = false;

  constructor(private http: HttpClient) { }

  updateName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.name = inputElement.value;
  }

  updatePlace(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.place = inputElement.value;
  }

  updateAmount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.amount = +inputElement.value; // Convert amount to number
  }

  startVoiceRecognition() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
      const transcript = event.results[0][0].transcript;
      const words = transcript.split(' ');

      // Assuming the format: "Name Place Amount"
      if (words.length >= 3) {
        this.name = words[0] || '';
        this.place = words[1] || '';
        this.amount = +words[2] || 0; // Convert amount to number
        this.saveData(); // Automatically save to DB
      }
    };
    recognition.start();
  }

  saveData() {
    const data = {
      name: this.name,
      place: this.place,
      amount: this.amount
    };
    this.http.post('http://your-backend-api/save', data).subscribe(response => {
      console.log('Data saved', response);
      this.showGif = true;
      setTimeout(() => this.showGif = false, 3000); // Hide GIF after 3 seconds
      this.dataLabel = `Thank you for coming, ${this.name}`;
    });
  }

  viewCollection() {
    this.http.get('http://your-backend-api/collection').subscribe(data => {
      console.log('Data retrieved', data);
      this.dataLabel = JSON.stringify(data);
    });
  }
}
