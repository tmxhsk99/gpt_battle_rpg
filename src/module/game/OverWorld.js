import myRoom from "./images/maps/myRoom.png";
import shadowImage from "./images/characters/shadow.png";
import playerImage from "./images/characters/people/player.png";

export class OverWorld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 192;
        this.canvas.height = 192;
    }

    init() {
        const image = new Image();
        image.src = myRoom;
        image.onload =  () => {
            this.ctx.drawImage(image, 0, 0);
            console.log("image onLoaded");
            console.log(image);
        };



        const x = 4;
        const y = 6;

        const shadow = new Image();
        shadow.src = shadowImage;
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


        const player = new Image();
        player.src = playerImage
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
        };

    }
}