

class Tile extends ObservableClass<Tile> {
    private _value: number;
    private _uncovered: boolean;
    private _flagged: boolean;

    constructor() {
        super();
        this._value = 0;
        this._uncovered = false;
        this._flagged = false;

        this.notifyObserver();
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
        this.notifyObserver();
    }

    public get uncovered(): boolean {
        return this._uncovered;
    }

    public set uncovered(uncovered: boolean) {
        this._uncovered = uncovered;
        this.notifyObserver();
    }

    public get flagged(): boolean {
        return this._flagged;
    }

    public set flagged(flagged: boolean) {
        this._flagged = flagged;
        this.notifyObserver();
    }
}