import * as firebase from "firebase";
import SearchArticle from "./components/SearchArticle";
import SavedArticle from "./components/SavedArticle";

var config = {
  apiKey: "AIzaSyC0W55ACIMhUL5QceH6O1ruKk-7Bx2lECQ",
  authDomain: "meraki-articl-saver.firebaseapp.com",
  databaseURL: "https://meraki-articl-saver.firebaseio.com",
  projectId: "meraki-articl-saver",
  storageBucket: "meraki-articl-saver.appspot.com",
  messagingSenderId: "529330771528"
};
firebase.initializeApp(config);

const savedArticles = [];
const SavedArticlesHolder = document.getElementById("SavedArticlesHolder");
const searchArticlesHolder = document.getElementById("searchArticlesHolder");

const savedArticle = new SavedArticle(
  savedArticlesHolder,
  savedArticles,
  firebase
);
const searchArticle = new SearchArticle(
  savedArticles,
  searchArticlesHolder,
  firebase
);
