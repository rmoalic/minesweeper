import { Observer } from "./observer";
import { Tile } from "./tile";

export class Tile_element extends HTMLElement implements Observer<Tile> {

    constructor() {
        super();
        this.update_element(0, false, false);
    }

    update(data: Tile): void {
        if (data == null) return;
        this.update_element(data.value, data.uncovered, data.flagged);
    }

    private update_element(value: number, uncovered: boolean, flagged: boolean) {
        if (! uncovered) {
            if (flagged) {
                this.textContent = "🚩";
                this.style.backgroundColor = "lightgray";
            } else {
                this.textContent = " ";
                this.style.backgroundColor = "grey";
            }
        } else {
            switch (value) {
                case -1:
                    if (flagged) {
                        this.textContent = "💣";
                        this.style.backgroundColor = "green";
                    } else {
                        this.textContent = "💥";
                        this.style.backgroundColor = "red";
                    }
                    break;
                case 0:
                    this.textContent = " ";
                    this.style.backgroundColor = "white";
                    break;
                default: //normal numbers
                    this.textContent = value.toString();
                    this.style.backgroundColor = "lightblue";
            }
            switch (value) {
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
        if (value != -1 && flagged && uncovered) {
            this.textContent = "🚩";
            this.style.backgroundColor = "violet";
        }
    }
}


customElements.define('ms-tile', Tile_element);