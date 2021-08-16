
class MineSweeper_Element extends HTMLElement {

    private ms: MineSweeper;
    private status_bar: HTMLDivElement;
    private status_text: HTMLSpanElement;
    private game_board: HTMLDivElement;


    constructor() {
        super();
        let height: number = 15;
        let width: number = 15;
        let mines: number = 10;

        if (this.hasAttribute("height")) {
            const tmp = this.getAttribute("height")
            if (tmp != null)
                height = Number.parseInt(tmp);
        }
        
        if (this.hasAttribute("width")) {
            const tmp = this.getAttribute("width")
            if (tmp != null)
                width = Number.parseInt(tmp);
        }

        if (this.hasAttribute("mines")) {
            const tmp = this.getAttribute("mines")
            if (tmp != null)
                mines = Number.parseInt(tmp);
        }

        this.ms = new MineSweeper(height, width, mines);
        const table = this.ms.get_board();
        const shadow = this.attachShadow({mode: 'open'});

        // UI init
        const style = document.createElement("style");
        style.innerHTML = `
            :host {
                display: block;
                contain: content;
            }
            :host([hidden]) {
                display: none;
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

        for (let x = 0; x < height; x++) {
            const ms_row = document.createElement("div");
            for (let y = 0; y < width; y++) {
                const tile_value = table[x][y];
                tile_value.setAttribute("x", x.toString());
                tile_value.setAttribute("y", y.toString());
                tile_value.onclick = this.ms_click.bind(this);
                tile_value.oncontextmenu = this.ms_click.bind(this);
                ms_row.appendChild(tile_value);
            }
            this.game_board.appendChild(ms_row);
        }
        shadow.appendChild(this.game_board);
    }

    private ms_click(ev: MouseEvent): boolean {
        if (ev.target == null) return false;
        const target2 = ev.target as Tile;
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
        } else if (this.ms.is_lost) {
            this.status_text.textContent = "lost :(";
        }

        return false;
    }

    attributeChangedCallback(name: string, oldValue: string|null, newValue: string|null) {
        if (oldValue == null) return;
        throw "changing attributes is not supported";
    }
    static get observedAttributes() {return ['width', 'lenght', 'mines']; }
}

customElements.define('ms-element', MineSweeper_Element);