

class Tile extends HTMLElement {
    private _value: number;
    private _uncovered: boolean;
    private _flagged: boolean;

    constructor(value: number) {
        super();
        this._value = value;
        this._uncovered = false;
        this._flagged = false;

        this.update();
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
        this.update();
    }

    public get uncovered(): boolean {
        return this._uncovered;
    }

    public set uncovered(uncovered: boolean) {
        this._uncovered = uncovered;
        this.update();
    }

    public get flagged(): boolean {
        return this._flagged;
    }

    public set flagged(flagged: boolean) {
        this._flagged = flagged;
        this.update();
    }

    private update() {
        if (! this._uncovered) {
            if (this._flagged) {
                this.textContent = "🚩";
                this.style.backgroundColor = "lightgray";
            } else {
                this.textContent = " ";
                this.style.backgroundColor = "grey";
            }
        } else {
            switch (this._value) {
                case -1:
                    this.textContent = "💣";
                    if (this.flagged) {
                        this.style.backgroundColor = "green";
                    } else {
                        this.style.backgroundColor = "red";
                    }
                    break;
                case 0:
                    this.textContent = " ";
                    this.style.backgroundColor = "white";
                    break;
                default: //normal numbers
                    this.textContent = this._value.toString();
                    this.style.backgroundColor = "lightblue";
            }
            switch (this._value) {
                case 1:
                    this.style.color = "blue";
                    break;
                case 2:
                    this.style.color = "darkgreen";
                    break;
                case 3:
                    this.style.color = "red";
                    break;
                case 4:
                    this.style.color = "darkblue";
                    break;
                case 5:
                    this.style.color = "darkred";
                    break;
                case 6:
                    this.style.color = "darkturquoise";
                    break;
                case 7:
                    this.style.color = "darkmagenta";
                    break;
                case 7:
                    this.style.color = "darkorange";
                    break;
                default:
                    this.style.color = "black";
            }
        }
        if (this._value != -1 && this._flagged && this._uncovered) {
            this.textContent = "🚩";
            this.style.backgroundColor = "violet";
        }
    }
}


customElements.define('ms-tile', Tile);