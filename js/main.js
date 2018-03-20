//import SearchArticle from "./components/SearchArticle";
import SavedArticle from "./components/SavedArticle";
const savedArticles = [];
const SavedArticlesHolder = document.getElementById("SavedArticlesHolder");
//const searchArticlesHolder = document.getElementById("searchArticlesHolder");
const savedArticle = new SavedArticle(savedArticlesHolder, savedArticles);
