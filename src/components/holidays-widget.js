import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class HolidaysWidget extends LitElement {
    static properties = {
        header: { type: String },
        country: { type: String },
        holidays: { type: Array }
    }

    static styles = css`
        :host {
            display: block;
            width: 350px;
            height: 350px;
            background-color: azure;
            margin-left: 7%;
            height: auto; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        h3 {
            margin: 0;
            padding: 10px;
            text-align: center;
            background-color: lightblue;
        }

        label {
            display: block;
            padding: 10px;
            font-weight: bold;
        }

        select {
            display: block;
            margin: 0 auto;
            padding: 5px;
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            text-align: left;
        }

        li {
            padding: 10px;
            border-bottom: 1px solid lightgray;
        }
    `;

    constructor() {
        super();
        this.header = 'Upcoming Public Holidays';
        this.country = 'AU';
        this.holidays = [];
    }

    async firstUpdated() {
        await this.fetchHolidays();
    }

    /* 
    * The **async** function allows the rest of the code to continue executing while the HTTP request
    * is being made and the response is being retrieved
    */
    async fetchHolidays() {
        fetch(`https://date.nager.at/api/v3/publicholidays/2023/${this.country}`)
            .then(response => response.json())
            .then(_holidays => {
                this.holidays = _holidays;
            }
            );
    }

    // Display different the upcoming holidays depending on the selected country
    render() {
        // Get the current date
        const currentDate = new Date();

        // Filter the holidays to get only the upcoming holidays
        const upcomingHolidays = this.holidays.filter(_holidays => {
            const holidayDate = new Date(_holidays.date);
            return holidayDate >= currentDate;
        });

        // Sort the upcoming holidays by date
        upcomingHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (this.holidays) {
            return html`
          <h3>${this.header}</h3>
          <label>Country:</label>
          <select @change="${this.handleCountryChange}">
            <option value="AU" ?selected="${this.country === 'AU'}">Australia</option>
            <option value="CA" ?selected="${this.country === 'CA'}">Canada</option>
            <option value="US" ?selected="${this.country === 'US'}">United States</option>
            <option value="GB" ?selected="${this.country === 'GB'}">United Kingdom</option>
            <option value="NZ" ?selected="${this.country === 'NZ'}">New Zealand</option>
            <option value="AL" ?selected="${this.country === 'AL'}">Albania</option>
            <option value="AT" ?selected="${this.country === 'AT'}">Austria</option>
            <option value="CN" ?selected="${this.country === 'CN'}">China</option>
            <option value="CO" ?selected="${this.country === 'CO'}">Columbia</option>
            <option value="FR" ?selected="${this.country === 'FR'}">France</option>
            <option value="ES" ?selected="${this.country === 'ES'}">Spain</option>
            <option value="GR" ?selected="${this.country === 'GR'}">Greece</option>
            <option value="IT" ?selected="${this.country === 'IT'}">Italy</option>
            <option value="NO" ?selected="${this.country === 'NO'}">Norway</option>
            <option value="PT" ?selected="${this.country === 'PT'}">Portugal</option>
          </select>
          <ul>
            ${upcomingHolidays.map(holiday => html`<li>${holiday.date} - ${holiday.name}</li>`)}
          </ul>
        `;
        } else {
            return html`<p>Loading...</p>` //displays loading text if the widget has not loaded-in yet
        }
    }

    // Changes holidays when selecting different countries
    handleCountryChange(event) {
        this.country = event.target.value;
        this.fetchHolidays();
    }
}
customElements.define('holidays-widget', HolidaysWidget);
