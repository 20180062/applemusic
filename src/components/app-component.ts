import { html, render } from "lit-html"
import collectionService from "../collection-service";

import "./song/collection-table-component";

//für den Nutzer sehbare Felder - View
const template = html`
    <label for="collection">Search:</label>
    <input type="text" id="collection">
    <button value="Enter">Submit</button>
    <br><br>

    <collection-table></collection-table>
`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        console.log("app component connected")
        render(template, this.shadowRoot)
        const input = this.shadowRoot.querySelector<HTMLInputElement>("input"); //Texteingabe des Users
        const button = this.shadowRoot.querySelector<HTMLButtonElement>("button"); //Submit-Button
        button.onclick = () => {
            collectionService.search(input.value,"album");
        };
    }
}
customElements.define("app-component", AppComponent)