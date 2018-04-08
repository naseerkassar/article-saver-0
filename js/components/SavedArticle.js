import SavedListItem from "./SavedListItem";
//import axios from "axios";
export default class SavedArticle {
  constructor(savedArticlesHolder, savedArticles, firebase) {
    this.savedArticlesHolder = savedArticlesHolder;
    this.savedArticles = savedArticles;
    this.firebase = firebase;
    this.list = "";
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
    this.list.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(e) {
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
            this.savedArticles
          );
        }
      });
  }
}
