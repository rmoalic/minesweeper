

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
                width: 2em;
                height: 2em;
                border: 1px solid black;
                text-align: center; 
                vertical-align: middle;
                margin: 1px;
            }
            .ms_covered {
                background-color: gray;
            }
            .ms_blank {
                background-color: white;
            }
            .ms_bomb {
                background-color: red;
            }
            .ms_number {
                background-color: lightblue;
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
            } else {
                this.text_span.textContent = " ";
            }
            this.text_span.className = "";
            this.text_span.classList.add("ms_covered");
        } else {
            switch (this._value) {
                case -1:
                    this.text_span.textContent = "💣";
                    this.text_span.className = "";
                    this.text_span.classList.add("ms_bomb");
                    break;
                case 0:
                    this.text_span.className = "";
                    this.text_span.classList.add("ms_blank");
                    break;
                default:
                    this.text_span.textContent = this._value.toString();
                    this.text_span.className = "";
                    this.text_span.classList.add("ms_number");
            }    
        }
    }

    get_value(): number {
        if (this._uncovered) {
            return this.value;
        } else {
            return 10;
        }
    }
}


customElements.define('ms-tile', Tile);