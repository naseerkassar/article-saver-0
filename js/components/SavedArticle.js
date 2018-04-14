import axios from "axios";
import * as firebase from "firebase";
import SavedListItem from "./SavedListItem";
const popupS = require("popups");
export default class SavedArticle {
  constructor(savedArticlesHolder, savedArticles, firebase) {
    this.savedArticlesHolder = savedArticlesHolder;
    this.savedArticles = savedArticles;
    this.firebase = firebase;
    this.list = "";
    this.savedListId = "";
    this.articl = "";
    this.generateHTML();
    this.getOnlineData();
  }

  generateHTML() {
    this.savedArticlesHolder = document.getElementById("savedArticlesHolder");
    const html = `<div id="savedResults">
                     <h1>Saved Articles</h1>
                     <ul></ul>
                  </div>            
              `;
    this.savedArticlesHolder.insertAdjacentHTML("beforeend", html);
    this.list = this.savedArticlesHolder.querySelector("ul");
    this.list.addEventListener("click", this.handleSavedItems.bind(this));
  }

  handleSavedItems(e) {
    if (e.target.nodeName == "A") {
      e.preventDefault();
      const id = e.target.parentElement.dataset.id;
      e.target.parentElement.remove();

      /*
      this.savedArticles = this.savedArticles.filter(function(el) {
        return el != id;
      });
      */
      const locationOfId = this.savedArticles.indexOf(id);
      this.savedArticles.splice(locationOfId, 1);
      console.log(this.savedArticles);
      this.firebase
        .database()
        .ref("articles")
        .set(this.savedArticles);
    }
    if (e.target.nodeName == "H2" || e.target.nodeName == "IMG") {
      this.liId = e.target.parentElement.dataset.id;

      axios
        .get(
          "https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=" +
            this.liId
        )
        .then(response => {
          this.article = response.data.response.items[0];
          console.log(this.article);
          popupS.modal({
            content: `<h2>${this.article.title}</h2>
          <img src="${this.article.image.large}"></img>
          <p>${this.article.text_html}</p>`
          });
        })

        .catch(function(error) {
          console.log(error);
        });
    }
  }
  getOnlineData() {
    this.firebase
      .database()
      .ref("articles")
      .once("value", snapshot => {
        var result = snapshot.val();
        for (var prop in result) {
          const id = result[prop]; //5123485
          this.savedArticles.push(id);
          const savedListItem = new SavedListItem(
            id,
            this.list,
            this.savedArticles,
            this.firebase
          );
        }
      });
  }
}
