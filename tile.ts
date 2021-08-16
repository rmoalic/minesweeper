

class Tile extends HTMLElement {
    private _value: number;
    private _uncovered: boolean;
    private _flagged: boolean;
    private text_span: HTMLSpanElement;

    constructor(value: number) {
        super();
        this._value = value;
        this._uncovered = false;
        this._flagged = false;
        
        const shadow = this.attachShadow({mode: 'open'});
        this.text_span = document.createElement("span");

        const style = document.createElement("style");
        style.innerHTML = `
            span {
                display: inline-block;
                width: 1.2em;
                height: 1.2em;
                border: 1px solid black;
                text-align: center; 
                vertical-align: middle;
                margin: 1px;
            }
        `;
        shadow.appendChild(style);
        shadow.appendChild(this.text_span);
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
                this.text_span.textContent = "🚩";
                this.text_span.style.backgroundColor = "lightgray";
            } else {
                this.text_span.textContent = " ";
                this.text_span.style.backgroundColor = "grey";
            }
        } else {
            switch (this._value) {
                case -1:
                    this.text_span.textContent = "💣";
                    if (this.flagged) {
                        this.text_span.style.backgroundColor = "green";
                    } else {
                        this.text_span.style.backgroundColor = "red";
                    }
                    break;
                case 0:
                    this.text_span.textContent = " ";
                    this.text_span.style.backgroundColor = "white";
                    break;
                default:
                    this.text_span.textContent = this._value.toString();
                    this.text_span.style.backgroundColor = "lightblue";
            }    
        }
        if (this._value != -1 && this._flagged && this._uncovered) {
            this.text_span.textContent = "🚩";
            this.text_span.style.backgroundColor = "violet";
        }
    }
}


customElements.define('ms-tile', Tile);