import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.image = "https://hax.psu.edu/7d3549e0.png";
    this.background_color = "#fff";
    this.description = "Here's a image included on hax.psu.edu website, below the details button will take you to the site.";
    this.fancy = false;
  }


  static get styles() {
    return css`
      :host {
        display: block;
        margin: 5px;
        border: 1px solid grey;
        border-radius: 20px;
      }
      :host([fancy]) {
        display: block;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

      .card-content {

        border-radius: 20px;
        width: 400px;
        height: auto;

        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        text-align: center;

        object-fit: scale-down;
        aspect-ratio: auto 3/4;
        }

        :host h2 {
        padding: 5px 15px;
        font-weight: 600;

        }

        :host #card-image {
        width: 90%;
        src: attr(image);
        }

        :host p {
        width: 70%;
        margin-bottom: 20px;
        }

        :host a {
        text-decoration: underline;
        padding: 5px 15px;
        border: 1px solid rgba(85, 85, 85, 0.219);
        color: black;

        margin-bottom: 10px;
        }
        
        details summary {
          text-align: left;
          font-size: 20px;
          padding: 8px 0;
        }

        details[open] summary {
          font-weight: bold;
        }
        
        details div {
          border: 2px solid black;
          text-align: left;
          padding: 8px;
          height: 70px;
          overflow: auto;
        }
    `;
  }

  duplicateCard(e) {
    console.log(e);
    if (document.querySelectorAll('my-card').length < 10) {
      const newCard = this.cloneNode(true);
        
      document.querySelector('body').appendChild(newCard);
    }
  }

  changeTitle(e) {
    console.log(e);
    this.title = "Penn State";
  }

  changeImage(e) {
    console.log(e);
    this.image = "https://www.psu.edu/psu-edu-assets/images/shared/psu-mark.svg";
  }

  changeBackground(e) {
    console.log(e);
    this.background_color = "#5f4";
  }

  deleteCard(e) {
    console.log(e);
    if (document.querySelectorAll('my-card').length > 1)   {  
      this.remove();
    }
  }

  openChanged(e) {
    console.log(e);
    if (e.target.getAttribute('open') !== null) {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
    
    <div class="card-content" style="background-color: ${this.background_color}">
      <div id="controller">
        <button class="duplicate" @click="${this.duplicateCard}">Clone Card</button>
        <button id="changetitle" @click="${this.changeTitle}">Change title</button>
        <button id="changeimage" @click="${this.changeImage}">Change image</button>
        <button id="changebg" @click="${this.changeBackground}">Change background</button>
        <button id="delete" @click="${this.deleteCard}">Delete card</button>
      </div>
      <h2 class="card-title">
        ${this.title}
      </h2>
      <img src=${this.image} alt="hax.psu image" id="card-image">
      <details ?open="${this.fancy}" @toggle="${this.openChanged}">
        <summary>Description</summary>
        <div>
          <slot>${this.description}</slot>
        </div>
      </details>
      <a href="https://hax.psu.edu">Details</a>
    </div>`;
  }

  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      background_color: { type: String },
      description: { type: String },
      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
