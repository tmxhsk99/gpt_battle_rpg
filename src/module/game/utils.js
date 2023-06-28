export const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x, y) {
        return `${x * 16},${y * 16}`;
    },
    nexPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 16;
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        }
        return {x, y}
    },
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail: detail,
        });
        document.dispatchEvent(event);
    },
    /**
     * 매개변수의 방향에따라 마주보는 방향을 반환한다.
     * @param direction
     * @returns {direction}
     */
    oppositeDirection(direction) {
        if (direction === "left") {
            return "right";
        } else if (direction === "right") {
            return "left";
        } else if (direction === "up") {
            return "down";
        } else if (direction === "down") {
            return "up";
        }
    }
}

