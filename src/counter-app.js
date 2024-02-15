import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.counter = 16;
    this.min = 10;
    this.max = 25;
  }


  static get styles() {
    return css`
    :host {
        display: block;
        margin: 5px;
    }

    :host .counter-wrapper {
        display: flex;
        flex-direction: column;
        flex-basis: space-around;
        align-items: center;
        justify-content: center;
        padding: 40px 60px;
    }

    :host .counter-wrapper h1 {
        font-size: 24px;
    }

    :host .buttons-wrapper {
        display: flex;
        flex-direction: row;
        flex-basis: space-evenly;
        align-items: center;
        justify-content: center;
    }

    :host .buttons-wrapper button {
        padding: 5px 10px;
        border: 3px solid #d6fcf8;
        background-color: #fff;
    }

    :host .buttons-wrapper button:hover {
        background-color: #e1e1e1;
    }
    `;
  }

  increaseCounter(e) {
    console.log(e);
    if (this.counter < this.max)
        this.counter += 1;
  }

  decreaseCounter(e) {
    console.log(e);
    if (this.counter > this.min)
        this.counter -= 1;
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      // do your testing of the value and make it rain by calling makeItRain
      if (this.counter == 18) {
        this.style.color = "#ff4a4a";
      }   
      else if (this.counter == 21) {
        this.style.color = "#5da3ff";
        this.makeItRain();
      }
      else {
        this.style.color = "#000";
      }
    }
  }
  
  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  render() {
    return html`
    <confetti-container id="confetti">
        <div class="counter-wrapper">
            <h1>${this.counter}</h1>
            <div class="buttons-wrapper">
                <button ?disabled="${this.min === this.counter}" @click="${this.decreaseCounter}">-</button>
                <button ?disabled="${this.max === this.counter}" @click="${this.increaseCounter}">+</button>
            </div>
        </div>
    </confetti-container>
    `;
  }

  static get properties() {
    return {
      counter: { type: Number },
      max: { type: Number },
      min: { type: Number },
    };
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);