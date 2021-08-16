
class MineSweeper_Element extends HTMLElement {

    private ms: MineSweeper;

    constructor() {
        super();

        const width = 10;
        const height = 15;
        const shadow = this.attachShadow({mode: 'open'});

        this.ms = new MineSweeper(width, height, 15);
        const table = this.ms.get_board();
        
        for (let x = 0; x < width; x++) {
            const ms_row = document.createElement("div");
            for (let y = 0; y < height; y++) {
                const tile_value = table[x][y];
                tile_value.setAttribute("x", x.toString());
                tile_value.setAttribute("y", y.toString());
                tile_value.onclick = this.ms_click.bind(this);
                tile_value.oncontextmenu = this.ms_click.bind(this);
                ms_row.appendChild(tile_value);
            }
            shadow.appendChild(ms_row);
        }
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
        return false;
    }
}

customElements.define('ms-element', MineSweeper_Element);