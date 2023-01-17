import { html, render } from "lit-html"
import store from "../../model/store"
import { distinctUntilChanged, map } from "rxjs"
import { Collection } from "../../model/collection"

//collection-table Element (also die Anzeige der Suchergebnisse)
const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table-all">
        <thead>
            <tr>
                <th>Artist</th><th>Searched Entity</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`

const rowTemplateCollection = (collection: Collection) => html`
    <td>${collection.artistName}</td><td>${collection.collectionName}</td>
`
const rowTemplateTrack = (collection: Collection) => html`
    <td>${collection.artistName}</td><td>${collection.trackName}</td>
`


class UserTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("connected usertable")
        store.pipe( //wird automatisch aufgerufen wenn store.next() in "collection-service.ts" ausgeführt wird
                map(model => model.results), 
                //distinctUntilChanged() //haben sich results im draft geändert (sprich wurde nach etwas anderem gesucht)
            ).subscribe(collections => {//falls sich die results geändert haben wird render() aufgerufen
                this.render(collections) //und es werden die neuen results in die Tabelle eingefügt
            })
    }
    private render(collections: Array<Collection>) {
        render(tableTemplate, this.shadowRoot)

        const tbody = this.shadowRoot.querySelector("tbody")

        tbody.innerHTML = ""; //resettet die Anzeige der Suchergebnisse

        collections.forEach(collection => {
            const row = tbody.insertRow() //fügt eine neue leere Zeile in den tbody (also die Tabelle) ein
            //hierdurch merkt das Programm, wenn man auf eine Zeile klickt
            if (collection.trackName == null) {
                row.onclick = () => {
                    console.log("clicked on " + collection.collectionName);
                };
                render(rowTemplateCollection(collection), row) //befüllt die eingefügte Zeile "row" mit den Werten eines Eintrags

            } else {
                row.onclick = () => {
                    console.log("clicked on " + collection.trackName);
                };
                render(rowTemplateTrack(collection), row)
            }
            
        });
    }
}

customElements.define("collection-table", UserTableComponent)