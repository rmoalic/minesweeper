

class MineSweeper {

    private width: number;
    private height: number;
    private board: Tile[][];
    private nb_mines: number;
    private is_lost: boolean;
    private is_won: boolean;
    private remaining_tiles: number;


    constructor(width: number, height: number, nb_mines: number) {
        this.width = width;
        this.height = height;
        this.board = new Array(width);
        for (let x = 0; x < this.width; x++) {
            this.board[x] = new Array(height);
            for (let y = 0; y < this.height; y++) {
                this.board[x][y] = new Tile(0);
            }
        }
        this.nb_mines = nb_mines;
        if (nb_mines >= height * width) {
            throw "nb_mine > nb_tiles";
        }
        this.is_lost = false;
        this.is_won = false;
        this.remaining_tiles = height * width - nb_mines;
        this.add_mines();
        this.add_indicators();
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
        if (this.is_lost || this.is_won) return true;

        const is_mine = this.board[x][y].value == -1;
        if (is_mine) {
            this.is_lost = true;
        }

        if (this.board[x][y].value == 0) {
            this.uncover_blanc_tiles(x, y);
        } else if (this.board[x][y].value == -1) {
            this.uncover_mines_and_flags();
        } else {
            this.uncover_tile(x, y);
        }

        if (this.remaining_tiles <= 0) {
            this.uncover_mines_and_flags(true);
            this.is_won = true;
        }

        return ! is_mine;
    }

    flag(x: number, y: number) {
        if (x < 0) return;
        if (x >= this.width) return;
        if (y < 0) return;
        if (y >= this.height) return;
        if (this.board[x][y].uncovered) return;
        if (this.is_lost || this.is_won) return true;

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
        for (let i = 0; i < this.nb_mines; i++) {
            let placed: boolean = false;
            let tries = 0;
            while (! placed) {
                let x: number = Math.round(Math.random() * (this.width - 1));
                let y: number = Math.round(Math.random() * (this.height - 1));

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

    print_board() {
        for (let x = 0; x < this.width; x++) {
            let line: (string|number)[] = new Array(this.height);
            let i = 0;
            for (let y = 0; y < this.height; y++) {
                if (this.board[x][y].value == -1) {
                    line[i] = "B";
                } else if (this.board[x][y].value == 0) {
                    line[i] = " ";
                } else {
                    line[i] = this.board[x][y].value;
                }
                i++;
            }
            console.log(line.join());
        }
    }
}