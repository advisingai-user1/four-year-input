import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FourYearInputComponent } from './four-year-input/four-year-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import { APService } from './ap.service';

@NgModule({
    declarations: [
	AppComponent,
	FourYearInputComponent,
	NavbarComponent
    ],
    imports: [
	BrowserModule,
	FormsModule,
	HttpClientModule
    ],
    providers: [ APService, HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule { }
