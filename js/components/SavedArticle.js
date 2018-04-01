import * as firebase from "firebase";
import SavedListItem from "./SavedListItem";
//import axios from "axios";
export default class SavedArticle {
  constructor(savedArticlesHolder, savedArticles) {
    this.savedArticlesHolder = savedArticlesHolder;
    this.savedArticles = savedArticles;
    this.list = "";
    this.generateHTML();
    this.getOnlineData();
  }

  generateHTML() {
    this.savedArticlesHolder = document.getElementById("savedArticlesHolder");
    const html = `<div id="articlesHolder">
                     <h1>Saved Articles</h1>
                     <ul></ul>
                  </div>            
              `;
    this.savedArticlesHolder.insertAdjacentHTML("beforeend", html);
    this.list = this.savedArticlesHolder.querySelector("ul");
  }

  getOnlineData() {
    var config = {
      apiKey: "AIzaSyC0W55ACIMhUL5QceH6O1ruKk-7Bx2lECQ",
      authDomain: "meraki-articl-saver.firebaseapp.com",
      databaseURL: "https://meraki-articl-saver.firebaseio.com",
      projectId: "meraki-articl-saver",
      storageBucket: "meraki-articl-saver.appspot.com",
      messagingSenderId: "529330771528"
    };
    firebase.initializeApp(config);
    var data = firebase.database().ref("articles");
    data.once("value", snapshot => {
      var result = snapshot.val();
      for (var prop in result) {
        var id = this.savedArticles.push(result[prop]);
        const savedListItem = new SavedListItem(id, this.list);
      }
    });
  }
}
