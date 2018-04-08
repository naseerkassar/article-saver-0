import axios from "axios";
import * as firebase from "firebase";
export default class SavedListItem {
  constructor(id, list, savedArticles) {
    this.id = id;
    this.list = list;
    this.savedArticles = savedArticles;
    this.article = "";
    this.html = "";
    this.getDataSavedId();
  }
  getDataSavedId() {
    document.getElementById("loading").style.display = "block";
    axios
      .get("https://nieuws.vtm.be/feed/articles?format=json&ids=" + this.id)
      .then(response => {
        this.article = response.data.response.items[0];
        document.getElementById("loading").style.display = "none";
        this.getArticleInfo();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getArticleInfo() {
    this.html = `<li class="article" data-id="${this.article.id}" id="saved-${
      this.article.id
    }">
    <img src="${this.article.image.thumb}" alt="">
    <p>${this.article.created.formatted}</p>
    <h2>${this.article.title}</h2>
    <a href="" class="fa">&#xf014; </a></li>`;
    this.list.insertAdjacentHTML("beforeend", this.html);
  }
}
