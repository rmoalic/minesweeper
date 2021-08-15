

class Tile {
    public value: number;
    public uncovered: boolean;

    constructor(value: number) {
        this.value = value;
        this.uncovered = false;
    }

    get_value(): number {
        if (this.uncovered) {
            return this.value;
        } else {
            return 10;
        }
    }
}