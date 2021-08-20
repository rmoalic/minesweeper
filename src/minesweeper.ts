

class MineSweeper {

    private width: number;
    private height: number;
    private board: Tile[][];
    private nb_mines: number;
    private _is_lost!: boolean;
    private _is_won!: boolean;
    private remaining_tiles!: number;
    private seed: number;
    private _fake_random: boolean;


    constructor(height: number, width: number, nb_mines: number, _fake_random: boolean = false) {
        this.width = width;
        this.height = height;
        this.nb_mines = nb_mines;
        this.seed = 1;
        if (nb_mines >= height * width) {
            throw "nb_mine > nb_tiles";
        }
        
        this.board = new Array(width);
        for (let x = 0; x < this.width; x++) {
            this.board[x] = new Array(height);
            for (let y = 0; y < this.height; y++) {
                this.board[x][y] = new Tile();
            }
        }

        this._fake_random = _fake_random;
        this.reset();
    }

    public reset() {
        this.seed = 1;
        this._is_won = false;
        this._is_lost = false;
        this.remaining_tiles = this.height * this.width - this.nb_mines;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let tile = this.board[x][y];
                tile.flagged = false;
                tile.uncovered = false;
                tile.value = 0;
            }
        }
        this.add_mines();
        this.add_indicators();
    }

    public get is_won(): boolean {
        return this._is_won;
    }

    public get is_lost(): boolean {
        return this._is_lost;
    }

    get_board() {
        return this.board;
    }

    play(x: number, y: number): boolean {
        if (x < 0) return true;
        if (x >= this.width) return true;
        if (y < 0) return true;
        if (y >= this.height) return true;
        if (this.board[x][y].flagged) return true;
        if (this._is_lost || this.is_won) return true;

        const is_mine = this.board[x][y].value == -1;
        if (is_mine) {
            this._is_lost = true;
        }

        if (this.board[x][y].value == 0) {
            this.uncover_blanc_tiles(x, y);
        } else if (this.board[x][y].value == -1) {
            this.uncover_mines_and_flags();
        } else {
            this.uncover_tile(x, y);
        }

        if (! is_mine && this.remaining_tiles <= 0) {
            this.uncover_mines_and_flags(true);
            this._is_won = true;
        }

        return ! is_mine;
    }

    flag(x: number, y: number) {
        if (x < 0) return;
        if (x >= this.width) return;
        if (y < 0) return;
        if (y >= this.height) return;
        if (this.board[x][y].uncovered) return;
        if (this._is_lost || this._is_won) return true;

        this.board[x][y].flagged = ! this.board[x][y].flagged;
    }

    private uncover_tile(x: number, y:number) {
        if (! this.board[x][y].uncovered) {
            this.board[x][y].uncovered = true;
            this.remaining_tiles--;
        }
    }

    private uncover_blanc_tiles(x: number, y: number) {
        if (x < 0) return;
        if (x >= this.width) return;
        if (y < 0) return;
        if (y >= this.height) return;
        if (this.board[x][y].uncovered) return;

        this.uncover_tile(x, y);

        if (this.board[x][y].value != 0) {
            return;
        } else {
            this.uncover_blanc_tiles(x    , y - 1);
            this.uncover_blanc_tiles(x    , y + 1);
            this.uncover_blanc_tiles(x - 1, y    );
            this.uncover_blanc_tiles(x + 1, y    );
        }
    }

    private uncover_mines_and_flags(winning_move: boolean = false) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let b = this.board[x][y];
                if (b.value == -1) {
                    if (winning_move && ! b.flagged) {
                        this.flag(x, y);
                    }
                    this.uncover_tile(x, y);
                } else if (b.flagged) {
                    this.uncover_tile(x, y);
                }
            }
        }
    }

    private add_mines() {
        let random = this._fake_random ? this.fake_random() : Math.random;
        for (let i = 0; i < this.nb_mines; i++) {
            let placed: boolean = false;
            let tries: number = 0;
            while (! placed) {
                let x: number = Math.round(random() * (this.width - 1));
                let y: number = Math.round(random() * (this.height - 1));

                if (this.board[x][y].value != -1) {
                    this.board[x][y].value = -1;
                    placed = true;
                } else {
                    tries++;

                    if (tries > 300) throw "infinite loop";
                }
            }
        }
    }

    private inc_tile(x: number, y: number) {
        if (x < 0) return;
        if (x >= this.width) return;
        if (y < 0) return;
        if (y >= this.height) return;
        if (this.board[x][y].value == -1) return;

        this.board[x][y].value++;
    }

    private inc_square(x: number, y: number) {
        this.inc_tile(x    , y - 1);
        this.inc_tile(x    , y + 1);
        this.inc_tile(x - 1, y - 1);
        this.inc_tile(x - 1, y + 1);
        this.inc_tile(x + 1, y - 1);
        this.inc_tile(x + 1, y + 1);
        this.inc_tile(x - 1, y    );
        this.inc_tile(x + 1, y    );
    }

    private add_indicators() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.board[x][y].value == -1) {
                    this.inc_square(x, y);
                }
            }
        }
    }

    private fake_random() {        
        return () => {
            var x = Math.sin(this.seed++) * 10000;
            return x - Math.floor(x);
        }
    }
}