import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class triviawidget extends LitElement {
    
  website_url = 'http://numbersapi.com/random/trivia';

  static properties = {
    numberTrivia: { type: String },
  }
      
    
  static styles = css`
    :host {
      display: block;
      width: 350px;
      height: 350px;
      background-color: azure;
      min-height: 150px;
      height: auto; 
      margin-left: 7%;
      margin-bottom: 25px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    } 

    .triviaFact {
      font-size: 1.1em;
      padding-top: 2%;
      padding-left: 5%;
      padding-right: 5%;
      padding-bottom: 5%; 
    }

    .triviaTitle {
      font-size: 1.3em;
      padding-top: 3%;
      padding-bottom: 3%;
      background-color: lightblue;
      text-align: center;
    }

    .Loading {
      text-align:center;
    }
  `;
    
  constructor() {
    super();
    this.numberTrivia = '';
    this.fetchNumberTrivia();
  }

 /* 
 * The **async** function allows the rest of the code to continue executing while the HTTP request
 * is being made and the response is being retrieved
 */
  async fetchNumberTrivia() { 
    fetch(this.website_url)
      .then(response => response.text())
      .then(text => { 
        this.numberTrivia = text;
      }
    );
  }
        
  render() {
    if (!this.numberTrivia) 
      return html`<p class = "Loading">Loading...</p>` //displays if the trivia post hasn't displayed yet
    else
      return html`
        <h2 class = "triviaTitle">Random Number Trivia</h2>
        <p class="triviaFact" >${this.numberTrivia}</p>
    `;
  }
} 

customElements.define('trivia-widget',  triviawidget);