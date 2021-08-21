
export interface Observable<T> {
    registerObserver(obs: Observer<T>): void;
    unregisterObserver(obs: Observer<T>): void;
    notifyObserver(): void;
}

export interface Observer<T> {
    update(data: T): void;
}