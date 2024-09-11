import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class inspirequoteswidget extends LitElement {
    
    static website_url = 'https://api.goprogram.ai/inspiration';
  
    static properties = {
      _text: {state: true},
      quote: {type: String},
      author: {type: String}
      
    }
        
      
    static styles = css`
      :host {
        display: block;
        width: 350px;
        height: 350px;
        background-color: azure;
        height: auto; 
        margin-left: 7%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      } 
  
      h2 {
        font-size: 1.2em;
        font-weight:normal;
        font-style: italic;
        font-family: serif;
        padding-top: 2%;
        padding-left: 5%;
        padding-right: 5%;
        padding-bottom: 5%; 
      }
  
      p {
        padding-top: 1%;
        font-family: serif;
        padding-bottom: 5%;
        font-size: 1.2em;
      }
  
      .Loading {
        text-align:center;
      }

      .quoteTitle {
        padding-top: 5%;
        background-color: lightblue;
        font-weight: bold;
      }
    `;
      
    constructor() {
      super();
      this.author='';
      this.quote = '';
      
    }
  
   /* 
   * The **async** function allows the rest of the code to continue executing while the HTTP request
   * is being made and the response is being retrieved
   */
    connectedCallback(){
      super.connectedCallback();
      const url = inspirequoteswidget.website_url;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this._text = data;
      });

    }
    
          
    render() {
      if (this._text){
        return html`
        <h2 class = "quoteTitle">Inspiring Quote</h2>
        <h2>" ${this._text.quote} "</h2>
        <p> ~ ${this._text.author}</p>`;
      }
      else {
        return html`
        <p class = "Loading">Loading...</p>`; //displays if the quote post hasn't displayed yet
      }
    }
  } 
  
  customElements.define('inspirequotes-widget',  inspirequoteswidget); 