import myRoom from "./images/maps/DemoLower.png";
import shadowImage from "./images/characters/shadow.png";
import playerImage from "./images/characters/people/player.png";

export class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = config.canvas;

        this.ctx = this.canvas.getContext("2d");
    }

    init() {

        const image = new Image();

        image.src = myRoom;
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };

        const x = 5;
        const y = 6;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0, //left cut
                0, //top cut,
                32, //width of cut
                32, //height of cut
                x * 16 - 8,
                y * 16 - 18,
                32,
                32
            )
        }
        shadow.src = shadowImage;


        const player = new Image();
        player.onload = () => {
            this.ctx.drawImage(
                player,
                0, //left cut
                0, //top cut,
                32, //width of cut
                32, //height of cut
                x * 16 - 8,
                y * 16 - 18,
                32,
                32
            )
        }
        player.src = playerImage;



    }
}