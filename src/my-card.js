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
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 5px;
        border: 1px solid grey;
        border-radius: 20px;
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
    `;
  }

  render() {
    return html`<div class="card-content" style="background-color: ${this.background_color}">
    <h2 class="card-title">
      ${this.title}
    </h2>
    <img src=${this.image} alt="hax.psu image" id="card-image">
    <p id="description">${this.description}</p>
    <a href="https://hax.psu.edu">Details</a>
  </div>`;
  }

  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      background_color: { type:  String },
      description: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
