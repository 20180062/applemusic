import { html, render } from "lit-html"
import collectionService from "../collection-service";

import "./song/collection-table-component";

//für den Nutzer sehbare Felder - View
const template = html`
    <!--<input type="radio" id="album" name="entity" value="album">
    <label for="css">Album</label>
    <input type="radio" id="song" name="entity" value="song">
    <label for="css">Song</label><br>-->

    <label for="collection">Search:</label>
    <input type="text" id="eingabe">

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
            collectionService.search(input.value,"song");
        };
    }
}
customElements.define("app-component", AppComponent)