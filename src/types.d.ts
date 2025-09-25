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
        foodPos: Pos,
        speed: number,
        walls: Collidable[],
    }
     
    type Point = { 
        x: number,
        y: number
    }

    type Line = { 
        start: Point,
        end: Point
    }
}

