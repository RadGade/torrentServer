// const axios = require('axios')
// let data

// async function tv() {
//     await axios.get('https://eztv.io/api/get-torrents?imdb_id=0436992&limit=100').then(resp => {
//         data = resp.data
//    });
// }


// tv()


const fetch = require("node-fetch");
const cheerio = require("cheerio");

const data = [];
function listmovie(number) {
  return fetch(
    `https://eztvtorrent.com/rick-and-morty-2013/`
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