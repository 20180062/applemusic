import produce from "immer";
import store from "./model/store";

class CollectionService {
    async search(name: String, entity: String) {
        const response = await fetch('https://itunes.apple.com/search?term=' + name + '&entity=' + entity);
        const searchResult = await response.json(); //parst die JSON-Datei
        let nextState = produce(store.getValue(), draft => {
            draft.results = searchResult.results;
        })

        console.log(nextState.results);

        store.next(nextState);
    }
}

const collectionService = new CollectionService();
export default collectionService;