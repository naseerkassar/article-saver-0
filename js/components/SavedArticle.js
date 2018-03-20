import * as firebase from "firebase";
//import axios from "axios";
export default class SavedArticle {
  constructor(savedArticlesHolder, savedArticles) {
    this.savedArticlesHolder = savedArticlesHolder;
    this.savedArticles = savedArticles;
    this.getOnlineData();
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
    data.once("value", function(snapshot) {
      console.log(snapshot.val());
    });
  }
}
