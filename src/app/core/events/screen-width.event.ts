import { Injectable, HostListener, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthResponse } from "../models/auth-response.class";

@Injectable({
    providedIn: 'root'
})
export class ScreenWidth implements OnInit {

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.getScreenWidth();
    }

    constructor() { }

    ngOnInit() {
    }

    public getScreenWidth() {
        return window.innerWidth;
    }

}