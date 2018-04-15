import axios from "axios";
import SearchArticle from "./SearchArticle";

export default class SavedListItem {
  constructor(id, list, savedArticles, firebase) {
    this.id = id;
    this.list = list;
    this.savedArticles = savedArticles;
    this.firebase = firebase;
    this.article = "";
    this.savedListHtml = "";
    this.getDataSavedId();
  }
  getDataSavedId() {
    document.getElementById("saveLoading").style.display = "block";
    axios
      .get("https://nieuws.vtm.be/feed/articles?format=json&ids=" + this.id)
      .then(response => {
        this.article = response.data.response.items[0];
        document.getElementById("saveLoading").style.display = "none";
        this.getArticleInfo();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getArticleInfo() {
    this.savedListHtml = `<li class="savedArticle" data-id="${
      this.article.id
    }" id="saved-${this.article.id}">
    <img src="${this.article.image.thumb}" alt="">
    <p>${this.article.created.formatted}</p>
    <h2>${this.article.title}</h2>
    <a href="" class="fa">&#xf014;</a></li>`;
    this.list.insertAdjacentHTML("beforeend", this.savedListHtml);
    //console.log(this.list);
  }
}
