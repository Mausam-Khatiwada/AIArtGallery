const mysql = require("../connection").con;

const fetchArtworksFromDatabase = () => {
  return new Promise((resolve, reject) => {
    mysql.query("SELECT * FROM artwork", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { fetchArtworksFromDatabase };
