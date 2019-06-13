import { Component, OnInit } from '@angular/core';
import { APService } from '../ap.service';
import { MajorService } from '../major.service';

@Component({
    selector: 'four-year-input',
    templateUrl: './four-year-input.component.html',
    styleUrls: ['./four-year-input.component.css']
})
export class FourYearInputComponent implements OnInit {
    fyp = {
	"id": null,
	"creation_time": null,
	"user": null,
	"majors": [],
	"UC" : null,
	"APs": [],
	"summer": false,
	"max_years": 4,
	"max_hrs": 18,
	"min_hrs": 12,
	"front_load": true,
	"mid_load": true,
	"back_load": true,
	"semesters": []
    };
    majors = [];
    APs = [];
    INVISIBLE_SEP= "⁣";		// NOT EMPTY STRING!!!!!
    validUC;
    invalidMin;
    invalidMax;
    currentYear;
    expandTriangle;
    APclass;
    
    constructor(private aps: APService,
		private mjs: MajorService) { }

    ngOnInit() {
	this.fetchAPs();
	this.fetchMajors();
	this.addDegree('');
	this.currentYear = (new Date()).getFullYear();
	this.fyp.UC = this.currentYear;
	this.validUC = true;
	this.expandTriangle ="▹";
	this.APclass = '';
	this.invalidMin='';
	this.invalidMax='';
    }

    fetchAPs(): void {
	this.aps.getAPs().subscribe( resp => {
	    this.APs = resp;
	});
    }

    fetchMajors(): void {
	this.mjs.getMajors().subscribe( resp => {
	    this.majors = resp;
	});
    }
    
    /* adds a new major to list */
    addDegree(degree: string) {
	this.fyp.majors.push(degree);
    }
    /* adds an empty string to the majors list so the user can add another major */
    newDegree(){
	if(this.fyp.majors[this.fyp.majors.length-1] !== '' ){
	    this.addDegree('');
	}
    }

    removeDegree(degree: string) {
	this.fyp.majors = this.fyp.majors.filter(d => d !== degree);
	if(this.fyp.majors.length == 0){
	    this.addDegree('');
	}
    }

;    trackByIndex(index, str){
	return index;
    }
    
    toggleTriangle(){
	if(this.expandTriangle === "▹"){
	    this.expandTriangle = "▿";
	}else{
	    this.expandTriangle = "▹";
	}
    }
    
    checkYear() {
	this.validUC = this.fyp.UC > this.currentYear-6;
    }
    
    checkMin(){
	if(this.fyp.min_hrs < 10){
	    this.invalidMin = `${this.fyp.min_hrs} is to low`;
	}else if(this.fyp.min_hrs > this.fyp.max_hrs){
	    this.invalidMin = "Must be less than max hours";
	}else{
	    this.invalidMin = '';
	}
    }
    
    checkMax() {
	if(this.fyp.max_hrs > 24){
	    this.invalidMax = `${this.fyp.max_hrs} is to high`;
	}else if(this.fyp.max_hrs < this.fyp.min_hrs){
	    this.invalidMax = "Must be greater than min hours"
	}else{
	    this.invalidMax = '';
	}
    }
    toggleSummerClasses(){
	this.fyp.summer = !this.fyp.summer;
    }

    addAP(){
	if(this.APclass.slice(-1) === this.INVISIBLE_SEP){
	    this.APclass = this.APclass.slice(0,-1); // without invisible separator
	    if(this.APs.includes(this.APclass) && !this.fyp.APs.includes(this.APclass)){
		this.fyp.APs.push(this.APclass);
	    }
	}
    }
    
    removeAP(ap: string) {
	this.fyp.APs = 	this.fyp.APs.filter(c => c !== ap);
    }

    validMajor(major: string): boolean {
	return major === '' || this.majors.includes(major);
    }
    checkMajors(): boolean{
	/* clean up majors */
	this.fyp.majors = Array.from(new Set(this.fyp.majors)); // remove duplicates
	if(this.fyp.majors.length <= 0) this.addDegree('');	// add an empty major if list is empty
	/* check major */
	for (var i = 0; i < this.fyp.majors.length; i++) {
	    if(!this.validMajor(this.fyp.majors[i])){
		return false;
	    }
	}
	return true;
    }
    
    submit(){
	if(this.validUC && this.checkMajors() && !this.invalidMax && !this.invalidMin){
	    this.fyp.id = 0;
	    this.fyp.name = "Bob Bill";
	    this.fyp.creation_time = (new Date()).getTime();
	    console.log(this.fyp);
	}
    }
}
