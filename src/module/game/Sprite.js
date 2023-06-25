import shadowImage from "./images/characters/shadow.png";

export class Sprite {

    constructor(config) {

        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.animationSpeed = config.animationSpeed || 8;
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
        this.animations = config.animation || {
            "idle-down": [[0, 0]],
            "idle-right": [[0, 1]],
            "idle-up": [[0, 2]],
            "idle-left": [[0, 3]],
            "walk-down": [[1, 0], [0, 0], [3, 0], [0, 0]],
            "walk-right": [[1, 1], [0, 1], [3, 1], [0, 1]],
            "walk-up": [[1, 2], [0, 2], [3, 2], [0, 2]],
            "walk-left": [[1, 3], [0, 3], [3, 3], [0, 3]],
        };

        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFreamLimit = config.animationFreamLimit || this.animationSpeed;
        this.animationFrameProgress = this.animationFreamLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        console.log(this.currentAnimation, this.currentAnimationFrame)
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFreamLimit;
        }

    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFreamLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }


    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32,
            frameY * 32,
            32, 32,
            x, y,
            32, 32
        )

        this.updateAnimationProgress()
    }
}