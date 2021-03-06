
import { MineSweeper } from "./minesweeper";
import { Tile } from "./tile";
import { Tile_element } from "./tile_element";

export class MineSweeper_Element extends HTMLElement {

    private ms: MineSweeper;
    private status_bar: HTMLDivElement;
    private status_text: HTMLSpanElement;
    private game_board: HTMLDivElement;
    private attributes_changed: boolean;

    private height: number;
    private width: number;
    private mines: number;
    private fake_random: boolean;


    constructor() {
        super();
        this.height = 15;
        this.width  = 15;
        this.mines  = 10;
        this.fake_random = false;

        this.attributes_changed = false;
        this.saveAttributes();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.addEventListener("reset", this.reset);

        // UI init
        const style = document.createElement("style");
        style.innerHTML = `
            :host {
                display: block;
                contain: content;
                font: 16px "DejaVu Sans", sans-serif;
            }
            :host([hidden]) {
                display: none;
            }
            ms-tile {
                display: inline-block;
                width: 1.2em;
                height: 1.2em;
                border: 1px solid black;
                text-align: center;
                vertical-align: middle;
                margin: 1px;
                font-size: 20px;
                font-weight: bold;
            }
            .board {
                white-space: nowrap;
                overflow: auto;
                user-select: none;
            }
        `;
        shadow.appendChild(style);

        // status bar
        this.status_bar = document.createElement("div");
        const pre_status_text = document.createElement("span");
        pre_status_text.textContent = "Game: ";
        this.status_text = document.createElement("span");
        this.status_text.textContent = "Ongoing";
        this.status_bar.appendChild(pre_status_text);
        this.status_bar.appendChild(this.status_text);
        shadow.appendChild(this.status_bar);

        // game board
        this.game_board = document.createElement("div");
        this.game_board.classList.add("board");

        this.ms = new MineSweeper(this.height, this.width, this.mines, this.fake_random);
        const tiles_data = this.ms.get_board();
        this.init_table(tiles_data);


        shadow.appendChild(this.game_board);
    }

    private saveAttributes() {
        if (this.hasAttribute("height")) {
            const tmp = this.getAttribute("height")
            if (tmp != null)
                this.height = Number.parseInt(tmp);
        }

        if (this.hasAttribute("width")) {
            const tmp = this.getAttribute("width")
            if (tmp != null)
                this.width = Number.parseInt(tmp);
        }

        if (this.hasAttribute("mines")) {
            const tmp = this.getAttribute("mines")
            if (tmp != null)
                this.mines = Number.parseInt(tmp);
        }
        this.fake_random = this.hasAttribute("fake_random");
    }

    private init_table(tiles_data: Tile[][]) {
        this.game_board.innerHTML = "";
        for (let y = this.height - 1; y >= 0; y--) {
            const ms_row = document.createElement("div");
            for (let x = 0; x < this.width; x++) {
                const tile_value = new Tile_element();
                tiles_data[x][y].registerObserver(tile_value);
                tile_value.setAttribute("x", x.toString());
                tile_value.setAttribute("y", y.toString());
                tile_value.onclick = this.ms_click.bind(this);
                tile_value.oncontextmenu = this.ms_click.bind(this);
                ms_row.appendChild(tile_value);
            }
            this.game_board.appendChild(ms_row);
        }
    }

    private reset() {
        this.status_text.textContent = "Ongoing";
        if (this.attributes_changed) {
            this.saveAttributes();
            try {
                this.ms = new MineSweeper(this.height, this.width, this.mines, this.fake_random);
                const tiles_data = this.ms.get_board();
                this.init_table(tiles_data);
            } catch (e) {
                this.status_text.textContent = "Error";
                throw e;
            }
        } else {
            this.ms.reset();
        }
    }

    private ms_click(ev: MouseEvent): boolean {
        if (ev.target == null) return false;
        const target2 = ev.target as Tile_element;
        const x_str = target2.getAttribute("x");
        if (x_str == null) return false;
        const y_str = target2.getAttribute("y");
        if (y_str == null) return false;
        const x = parseInt(x_str);
        const y = parseInt(y_str);

        if (ev.button == 0) {
            this.ms.play(x, y);
        } else {
            this.ms.flag(x, y);
        }

        if (this.ms.is_won) {
            this.status_text.textContent = "WON !!!";
            this.dispatchEvent(new Event("won"));
        } else if (this.ms.is_lost) {
            this.status_text.textContent = "lost :(";
            this.dispatchEvent(new Event("lost"));
        }

        return false;
    }

    attributeChangedCallback(name: string, oldValue: string|null, newValue: string|null) {
        if (newValue == null && name !== "fake_random") return;
        //throw "changing attributes is not supported";
        this.attributes_changed = true;
    }
    static get observedAttributes() {return ['width', 'height', 'mines', 'fake_random']; }
}

customElements.define('ms-element', MineSweeper_Element);