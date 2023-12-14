import { Injectable, HostListener, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthResponse } from "../models/auth-response.class";

@Injectable({
    providedIn: 'root'
})
export class ScreenWidth implements OnInit {

    ngOnInit() {
    }

    private widthSubject: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
    width$: Observable<number> = this.widthSubject.asObservable();

    constructor() {
        this.initializeResizeListener();
    }

    private initializeResizeListener() {
        window.addEventListener('resize', () => {
            this.widthSubject.next(window.innerWidth);
        });
    }

}