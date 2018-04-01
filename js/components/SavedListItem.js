import axios from "axios";
import * as firebase from "firebase";
export default class SavedListItem {
  constructor(id, list) {
    this.id = id;
    this.list = list;
    this.artical = "";
    this.getDataSavedId();
  }
}
