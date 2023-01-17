import { html, render } from "lit-html"
import collectionService from "../collection-service";

import "./song/collection-table-component";

//für den Nutzer sehbare Felder - View
const template = html`
    <input type="radio" id="album" name="entity" value="album">
    <label for="css">Album</label>
    <input type="radio" id="song" name="entity" value="song">
    <label for="css">Song</label><br>

    <label for="collection">Search:</label>
    <input type="text" id="userinput">

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
        const input = <HTMLInputElement>this.shadowRoot.getElementById("userinput"); //Texteingabe des Users
        const button = <HTMLButtonElement>this.shadowRoot.querySelector("button"); //Submit-Button

        button.onclick = () => {
            const album = <HTMLInputElement>this.shadowRoot.getElementById("album");
            const song = <HTMLInputElement>this.shadowRoot.getElementById("song");
            let entity = "";
            if (album.checked) {
                entity = album.value
            } else if (song.checked) {
                entity = song.value
            }
            collectionService.search(input.value,entity);
        };
    }
}
customElements.define("app-component", AppComponent)