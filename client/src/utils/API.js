import axios from "axios";

export default {
  // Gets all books
  getUsers: function() {
      console.log("API")
    return axios.get("/api/users");
  }
};