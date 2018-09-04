import * as firebase from "firebase";
import SearchArticle from "./components/SearchArticle";
import SavedArticle from "./components/SavedArticle";

var config = {
  apiKey: "////",
  authDomain: "//",
  databaseURL: "//",
  projectId: "//",
  storageBucket: "//",
  messagingSenderId: "///"
};
firebase.initializeApp(config);

const savedArticles = [];
const SavedArticlesHolder = document.getElementById("SavedArticlesHolder");
const searchArticlesHolder = document.getElementById("searchArticlesHolder");

const savedArticleInstance = new SavedArticle(
  savedArticlesHolder,
  savedArticles,
  firebase
);
const searchArticle = new SearchArticle(
  savedArticles,
  searchArticlesHolder,
  savedArticleInstance.list, // this is the UL from the right component (we need it so we know where to add when we click the heart)
  // this is the reason why I said to start with the right component, so you then have the instance where you can get the list from ;-)
  firebase
);
