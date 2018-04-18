import axios from "axios";
import SearchListItem from "./SearchListItem";
import SavedListItem from "./SavedListItem";
import { clearImmediate } from "timers";
const popupS = require("popups");
export default class SearchArticle {
  constructor(savedArticles, searchArticlesHolder, saveList, firebase) {
    this.savedArticles = savedArticles;
    this.searchArticlesHolder = searchArticlesHolder;
    this.saveList = saveList;
    this.firebase = firebase;
    this.searchHtml = "";
    this.form = "";
    this.value = "";
    this.ul = "";
    this.articles = "";
    this.generateHTML();
  }
  generateHTML() {
    this.searchHtml = `<h1>Search for article</h1>
    <form action="" id="form">
      <input type="text" id="field" value="" onfocus="this.value=''" placeholder=" Search" autofocus>
      <input type="submit" id="submit" value="search">
    </form>
    <div id="searchResults">
    <ul></ul></div>`;
    this.searchArticlesHolder.insertAdjacentHTML("beforeend", this.searchHtml);
    this.form = this.searchArticlesHolder.querySelector("form");
    this.ul = this.searchArticlesHolder.querySelector("ul");
    //adding event listener
    this.form.addEventListener("submit", this.performSearch.bind(this));
    this.ul.addEventListener("click", this.handleAdd.bind(this));
  }
  performSearch(e) {
    e.preventDefault();
    this.ul.innerHTML = "";
    this.value = document.getElementById("field").value;
    document.getElementById("SearchLoading").style.display = "block";
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${
          this.value
        }`
      )
      .then(response => {
        this.articles = response.data.response.items;
        document.getElementById("SearchLoading").style.display = "none";
        for (var prop in this.articles) {
          var article = this.articles[prop];
          //because I put the hearth click on this component I can access the this.saveList here.
          //but because you need it inside the clickHandler in your childcommponent, you need to pass it...
          const searchListItem = new SearchListItem(
            article,
            this.ul,
            this.savedArticles,
            this.saveList,
            this.firebase
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleAdd(e) {
    //set the event listener to the SearchListItem (li) for the popups
    if (
      e.target.nodeName == "H2" ||
      e.target.nodeName == "IMG" ||
      e.target.nodeName == "P"
    ) {
      this.liId = e.target.parentElement.dataset.id;

      axios
        .get(
          "https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=" +
            this.liId
        )
        .then(response => {
          this.article = response.data.response.items[0];
          //console.log(this.article);
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
    // console.log(e);
    if (e.target.nodeName == "A") {
      let id = parseInt(e.target.parentElement.dataset.id);
      e.preventDefault();
      //when heart is red => make it unSaved and black again
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        document.querySelector(`#saved-${id} a`).click();
        //saveNewItem.querySelector("A").click();
      } else {
        e.target.classList.add("active");
        this.savedArticles.push(id);
        const savedListItem = new SavedListItem(
          id,
          //what is this this.list? is it known here? I dont think so...
          //this.list, => this is undefined, so you pass something undefined
          this.saveList, // now this is known !!!
          this.savedArticles
        );
        this.firebase
          .database()
          .ref("articles")
          .set(this.savedArticles);
      }
    }
  }
}
