import {KeyPressListener} from "./KeyPressListener";

export class TextMessage {
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    /**
     * 텍스트 메시지 테그를 생성한다.
     */
    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('TextMessage');

        this.element.innerHTML = (
            `<p id="TextMessage_p"  class="TextMessage_p"></p>
            <button class ="TextMessage_button"><span class="blink"></span></button>`

        )


        const content = this.text;
        const TextMessage_p = this.element.querySelector("#TextMessage_p"); // ID를 기반으로 접근
        let sentence = this.text;
        let txtIdx = 0;

        function typing() {
            let txt = sentence[txtIdx++];
            if (txt == undefined) return;
            TextMessage_p.innerHTML += txt === "\n" ? "<br/>": txt;
            if (txtIdx > content.length) {
                txtIdx = 0;
            } else {
                setTimeout(typing, 35);
            }
        }

        typing();

        this.element.querySelector('button').addEventListener('click', () => {
            // 텍스트창을 닫는다.
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter",() => {
            this.actionListener.unbind();
            this.done();
        });

    }

    done() {
        this.element.remove();
        this.onComplete();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }


}