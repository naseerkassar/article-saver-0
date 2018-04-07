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
        console.log(response);

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
    <a href=""><i class="fa fa-close" style="font-size:24px"></i></a></li>`;
    this.list.insertAdjacentHTML("beforeend", this.html);
    const ul = document.querySelector("ul");
    ul.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    if (e.target.nodeName == "A") {
      e.preventDefault();
      const id = e.target.parentElement.dataset.id;
      e.target.parentElement.remove();
      this.savedArticles = this.savedArticles.filter(function(el) {
        return el != id;
      });
      //const locationOfId = this.savedArticles.indexOf(this.id);
      //const newSavedArticles = this.savedArticles.splice(locationOfId, 1);
      // console.log(newSavedArticles);
    }
    const firebaseRef = firebase.database().ref("articles");
    firebaseRef.set(this.savedArticles);
    console.log(this.savedArticles);
  }
}
