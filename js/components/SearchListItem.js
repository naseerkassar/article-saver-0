import * as firebase from "firebase";
import SavedListItem from "./SavedListItem";
export default class SearchListItem {
  constructor(article, ul, savedArticles, saveList, firebase) {
    this.article = article;
    this.ul = ul;
    this.savedArticles = savedArticles;
    this.saveList = saveList;
    this.firebase = firebase;
    this.liItem = "";
    //no reason to save this inside the constructor
    //this.searchListHtml = "";
    this.generateHTML();
  }
  generateHTML() {
    const html = `
      <li class="searchArticle" data-id="${
        this.article.fields.entity_id
      }" id="search-${this.article.fields.entity_id}">
        <h2>${this.article.node.label}</h2>
        <img src="${this.article.fields.image_path}" alt="">
        <p>${this.article.node.content}</p>
        <a href="" id="heart" class="fa">&#xf08a</a>
      </li>
    `;
    this.ul.insertAdjacentHTML("beforeend", html);
    this.liItem = document.getElementById(
      `search-${this.article.fields.entity_id}`
    );
    // console.log(this.liItem);
    //this eventlistener should be on parent, but it should work because you set the eventlistener on the li
    //I would have put it on the ul

    //when heart is clicked...

    let idChecking = this.inArray(
      this.article.fields.entity_id,
      this.savedArticles
    );
    //making it red or not...
    if (idChecking) {
      this.liItem.querySelector("#heart").classList.add("active");
    } else {
      this.liItem.querySelector("#heart").classList.remove("active");
    }
  }

  inArray(needle, heystack) {
    let length = heystack.length;
    for (let i = 0; i < length; i++) {
      if (heystack[i] === needle) {
        return true;
      }
    }
    return false;
  }
}
