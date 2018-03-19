import axios from "axios";
axios
  .get("https://vtm.be/feed/articles/solr?format=json&query=michael,jackson")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
