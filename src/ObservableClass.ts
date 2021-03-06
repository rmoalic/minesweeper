import { Observable, Observer } from "./observer";

export abstract class ObservableClass<T extends ObservableClass<T>> implements Observable<T> {
    private observers: Observer<T>[];

    constructor() {
        this.observers = new Array();
    }

    registerObserver(obs: Observer<T>): void {
        this.observers.push(obs);
    }
    unregisterObserver(obs: Observer<T>): void {
        this.observers = this.observers.filter((item) => item != obs);
    }
    notifyObserver(): void {
        this.observers.forEach((item: Observer<T>) => item.update(this as unknown as T));
    }
}