/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * 
 * <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class BlogBlock extends LitElement {
  static properties = {
    posts: { type: Array }
  };

  static styles = css`
  :host {
    margin: 3em;
  }

  .blogpost {
    text-align: left;
    width: 77vw;
    margin: 0 auto; 
    margin-right: 20px;
    background-color: azure;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
  }

  .blogpost p {
    overflow-wrap: break-word;
    word-wrap: break-word; 
    hyphens: auto; /* adds a - if word about to break */
    padding: 10px;
  }

  .blogpost h2 {
    background-color: lightblue;
    text-transform: capitalize;
    height: 30px;
    padding: 10px;
  }

  .blogpost h3 {
    text-transform: capitalize;
    height: 30px;
    padding-left: 10px;
  }

  .empty {  
    width: 60vw; /* vw is used to adjust distance per width size of each device */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rendering{
    width: 60vw; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `;

  constructor() {
    super();
    this.posts = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPosts();
  }

  fetchPosts() {
    const url = `${BASE_URL}blog`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.posts = data.posts;
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }

  static formatBody(text) {
    if (!text) {
      return html`<p class="empty">No content available... very sad</p>`;
    }

    const paragraphs = text.split('\r\n');
    return paragraphs.map((paragraph) => html`<p>${paragraph}</p>`);
  }

  render() {
    if (this.posts.length === 0) {
      return html`<p class = "rendering">Loading...</p>`;
    }
  
    return html`
      ${this.posts.map(
        (post) => html`
          <div class="blogpost">
            <h2>${post.title.slice(0, 50)}</h2>
            <h3>By ${post.name}</h3>
            ${BlogBlock.formatBody(post.content.slice(0, 250))}
          </div>
        `
      )}
    `;
  }
}

customElements.define('blog-block', BlogBlock);
