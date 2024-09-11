import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser } from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: { type: Object },
    title: { type: String },
    content: { type: String },
    maxCharLimitContent: { type: Number },
    maxCharLimitTitle: { type: Number },
    contentError: { type: Boolean },
    titleError: { type: Boolean },
  };

  static styles = css`
    :host {
        display: block;
        font-size: 15px;
    }
    
    
    .button{
      border-radius: 25px;
      width: 100px;
      height: 30px;
      font-size: 15px;
      cursor: pointer;
      background-color: lightblue;
    }

    button{
      border-radius: 25px;
      width: 100px;
      height: 30px;
      font-size: 15px;
      cursor: pointer;
      background-color: lightblue;
    }

    p{
      font-weight: bold;
    }

    .post-blog{ 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      max-width: 800px;
      padding: 20px;
      margin-top: 20px;
      background-color: azure;
      font-size: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      border-radius: 20px;
      resize: none;
      /* Disable textarea resizing */
    }

    .post-blog input[name='title'] {
      width: 50%;
      margin-bottom: 20px;
      margin-top: 10px;
      padding: 10px;
      font-size: 16px;
      resize: none; /* Disable textarea resizing */
    }

    .post-blog textarea {
      width: 80%;
      margin-bottom: 20px;
      margin-top: 10px;
      padding: 10px;
      font-size: 16px;
      resize: none;
    }

    .post-blog textarea {
      height: 150px;
    }

    .char-count{
      padding: 3%;
      margin: 0 auto;
    }

    .error {
      color: red;
      margin-top: 5px;
    }

    /* Style the login form */
    .login {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      max-width: 800px;
      padding: 20px;
      margin-top: 20px;
      background-color: azure;
      font-size: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      border-radius: 20px;
      resize: none;
    }

    .login input[name="username"],
    .login input[type="password"] {
      margin-left: 5px;
    }

    .button[type="submit"]:hover {
      background-color: #0062cc;
    }
  `;

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
    this.title = '';
    this.content = '';
    this.maxCharLimitContent = 250;
    this.maxCharLimitTitle = 30;
    this.contentError = false;
    this.titleError = false;
  }

  submitForm(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => result.json())
      .then((response) => {
        this.user = response;
        storeUser(response);
      });
  }

  postBlog(event) {
    event.preventDefault();
    // Check if the content or title is empty
    if (this.content.trim() === '' || this.title.trim() === '') {
      this.contentError = this.content.trim() === '';
      this.titleError = this.title.trim() === '';
      return;
    }

    const postData = {
      title: this.title,
      content: this.content,
    };

    fetch(`${BASE_URL}blog`, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.user.token}`,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        this.title = '';
        this.content = '';
        window.location.reload(); // Reload the page after posting so you can see your post
      });
  }

  updateContent(event) {
    const content = event.target.value;
    // Check if the content exceeds the character limit
    if (content.length <= this.maxCharLimitContent) {
      this.content = content;
      this.contentError = false; // Clear the error flag
    } else {
      // If the content exceeds the character limit, truncate it
      this.content = content.slice(0, this.maxCharLimitContent);
      this.contentError = true; // Set the error flag
    }
  }

  updateTitle(event) {
    const title = event.target.value;
    // Check if the title exceeds the character limit
    if (title.length <= this.maxCharLimitTitle) {
      this.title = title;
      this.titleError = false; // Clear the error flag
    } else {
      // If the title exceeds the character limit, truncate it
      this.title = title.slice(0, this.maxCharLimitTitle);
      this.titleError = true; // Set the error flag
    }
  }

  logout() {
    deleteUser();
    this.user = null;
  }

  render() {
    if (this.user) {
      // if logged in, the post form will appear
      return html`
        <p>Logged in as ${this.user.name}</p>
        <button @click=${this.logout}>Logout</button>

        <form class="post-blog" @submit=${this.postBlog}>
          Title:
          <input
            name="title"
            .value=${this.title}
            @input=${this.updateTitle}
            ?disabled=${this.titleError}
          />
          ${this.titleError ? html`<div class="error">Title cannot exceed ${this.maxCharLimitTitle} characters or has no characters</div>` : ''}
          Content:
          <textarea
            name="content"
            .value=${this.content}
            @input=${this.updateContent}
            ?disabled=${this.contentError}
          ></textarea>
          ${this.contentError ? html`<div class="error">Content cannot exceed ${this.maxCharLimitContent} characters or has no characters</div>` : ''}
          <div class="char-count">${this.maxCharLimitContent - this.content.length} characters remaining</div>
          <input type="submit" value="Post" class="button" ?disabled=${this.contentError || this.titleError} />
        </form>
      `;
    }

    return html`
      <form class="login" @submit=${this.submitForm}>
        Username: <input name="username" />
        Password: <input type="password" name="password" />
        <input type="submit" value="Login" class="button" />
      </form>
    `;
  }
}

customElements.define('login-widget', LoginWidget);

