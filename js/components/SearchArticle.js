import axios from "axios";
export default class SearchArticle {
  constructor(savedArticles, searchArticlesHolder, firebase) {
    this.savedArticles = savedArticles;
    this.searchArticlesHolder = searchArticlesHolder;
    this.firebase = firebase;
    this.searchHtml = "";
    this.form = "";
    this.value = "";
    this.searchUl = "";
    this.articles = "";
    this.generateHTML();
  }
  generateHTML() {
    this.searchHtml = `<h1>Search for your articel</h1>
    <form action="" id="form">
      <input type="text" id="field" value="" placeholder=" Search">
      <input type="submit" id="submit" value="Submit">
    </form>
    <div id="searchResults">
    <ul></ul></div>`;
    this.searchArticlesHolder.insertAdjacentHTML("beforeend", this.searchHtml);
    this.form = this.searchArticlesHolder.querySelector("form");
    const searchResults = document.getElementById("searchResults");
    this.searchUl = searchResults.querySelector("ul");
    this.form.addEventListener("submit", this.performSearch.bind(this));
  }
  performSearch(e) {
    e.preventDefault();
    this.value = document.getElementById("field").value;
    document.getElementById("loading").style.display = "block";
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${
          this.value
        }`
      )
      .then(response => {
        console.log(response);
        this.articles = response.data.response.items;
        document.getElementById("loading").style.display = "none";
        for (var prop in this.articles) {
          var article = this.articles[prop];
          new searchListItem(article);
          console.log(article);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
