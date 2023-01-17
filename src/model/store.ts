import { BehaviorSubject } from "rxjs"
import { Collection } from "./collection"

interface Model {
    readonly results: Array<Collection>;
    readonly selectedSong: Collection | null;
}

const initialState: Model = {
    results: new Array<Collection>, // Keine Suchergebnisse am Anfang
    selectedSong: null // Kein ausgewählter Song am Anfang
}

const store = new BehaviorSubject<Model>(initialState)
export default store
