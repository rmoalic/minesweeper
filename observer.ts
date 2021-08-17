
interface Observable<T> {
    registerObserver(obs: Observer<T>): void;
    unregisterObserver(obs: Observer<T>): void;
    notifyObserver(): void;
}

interface Observer<T> {
    update(data: T): void;
}