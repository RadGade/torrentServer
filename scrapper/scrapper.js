const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");
let count = 0,
  limit;
const searchURL = `https://ytsmovietorrent.com/?s=`;
const dataurl = ``;
const magURL = `https://ytsmovietorrent.com/`;
const data = [];
function listmovie(number) {
  return fetch(
    `https://ytsmovietorrent.com/category/science-fiction/page/${number}`
  )
    .then(res => res.text())
    .then(async body => {
      const movies = [];
      const $ = cheerio.load(body);
      $(".link-image").each((i, element) => {
        const $element = $(element);
        const $idRawDirt = $element.find("img");
        const $idRaw = $idRawDirt.attr("src").split("/");
        const $id = $idRaw[8].split(".");
        const $link = $element.attr("href").split("/");
        const movie = {
          id: $id[0],
          link: $link[3]
        };
        movies.push(movie);
      });

      console.log(movies);
      return movies;
    });
}

function search(query) {
  return fetch(`${searchURL}${query}`)
    .then(res => res.text())
    .then(body => {
      const movies = [];
      const $ = cheerio.load(body);
      $(".link-image").each((i, element) => {
        const $element = $(element);
        const $idRawDirt = $element.find("img");
        const $idRaw = $idRawDirt.attr("src").split("/");
        const $id = $idRaw[8].split(".");
        const $link = $element.attr("href").split("/");
        const movie = {
          id: $id[0],
          link: $link[3]
        };

        movies.push(movie);
      });

      console.log(movies);
      return movies;
    });
}

function getmagLink(link) {
  return fetch(`${magURL}${link}`)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);
      const maglink = $(".btn-primary").attr("href");
      return maglink;
    });
}

module.exports = {
  // body...
  listmovie,
  getmagLink,
  search
};
