/**
 * TYPEWRITER.JS
 * A lightweight vanilla JS typing effect.
 * Usage: <span class="typewriter" data-words='["Word 1", "Word 2"]'></span>
 */

export class TypeWriter {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}

export function initTypewriter() {
    const elements = document.getElementsByClassName('typewriter');
    for (let i = 0; i < elements.length; i++) {
        // Prevent multiple initializations
        if (elements[i].getAttribute('data-typewriter-init')) continue;

        let toRotate = elements[i].getAttribute('data-words');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            elements[i].setAttribute('data-typewriter-init', 'true');
            new TypeWriter(elements[i], JSON.parse(toRotate), period);
        }
    }
    // Inject CSS for cursor
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewriter > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
}
