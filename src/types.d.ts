export { };

declare global {

    type Pos = {
        x: number,
        y: number,
        w: number,
        h: number
    }

    type Collidable = {
        pos: Pos,
        collidable: boolean
    }

    type BlockDimensions = {
        w: number,
        h: number,
    }

    type GameState = {
        level: number,
        lives: number,
        speed: number,
        walls: Collidable[],
        food: Collidable[]
    }
}

