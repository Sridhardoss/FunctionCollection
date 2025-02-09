import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
@Component({
  selector: 'app-function-collect-amount',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './function-collect-amount.component.html',
  styleUrls: ['./function-collect-amount.component.css']
})
export class FunctionCollectionComponent {
  name: string = '';
  place: string = '';
  amount: number = 0;
  dataLabel: string = '';
  showGif: boolean = false;

  constructor(private http: HttpClient,private ngZone: NgZone) { }

  updateName(event: any) {
    this.name = event.target.value;
  }

  updatePlace(event: any) {
    this.place = event.target.value;
  }

  updateAmount(event: any) {
    this.amount = event.target.value;
  }

  startVoiceRecognition() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'ta-IN'; // Set to Tamil (India)
    recognition.interimResults = false; // Ensure final results are processed

    recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
      this.ngZone.run(() => {
        const transcript = event.results[0][0].transcript;
        const words = transcript.split(' ');
        console.log('words', words);
        console.log('wordslength', words.length);

        // Handle multiple names
        if (words.length >= 1) {
          this.name = words.slice(0, -2).join(', ') || '';
          console.log('name', this.name);
        }
        if (words.length >= 2) {
          this.place = words[words.length - 2] || '';
          console.log('place', this.place);
        }
        if (words.length >= 3) {
          this.amount = parseFloat(words[words.length - 1]) || 0; // Ensure correct conversion
          console.log('amount', this.amount);
      }
        // Optionally save data automatically
        //this.saveData();
      });
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
