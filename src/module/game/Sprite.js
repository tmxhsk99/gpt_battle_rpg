import shadowImage from "./images/characters/shadow.png";

export class Sprite {

    constructor(config) {

        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Shadow
        this.shadow = new Image();
        this.useShadow = config.useShadow || false;
        console.log("useShadow", this.useShadow);
        if (this.useShadow) {
            this.shadow.src = shadowImage;
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
            console.log("Shadow Loaded");
        }


        // Configure Animation & Initial State
        this.animation = config.animation || {
            idleDown: [
                [0, 0]
            ],
        };

        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        this.isLoaded && ctx.drawImage(this.image,
            0, 0,
            32, 32,
            x, y,
            32, 32
        )
    }
}