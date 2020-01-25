const express = require("express");
const torrentStream = require("torrent-stream");
const bodyParser = require("body-parser");
const { getmagLink, search, listmovie } = require("./scrapper/scrapper.js");
const app = express();
var server = require("http").Server(app);
var os = require("os");
var DIR = os.tmpdir() + "/torrent-web-poc";
const fs = require("fs");
let connections = [];

var port = process.env.PORT || 4200;

server.listen(port, () => {
  console.log(`launched on port ${port} 🚀`);
});

app.use(bodyParser.json());

app.get("/:num", async (req, res) => {
  let num = req.params.num;
  const data = await listmovie(num);
  res.json(data);
});

app.get("/search/:query", async (req, res) => {
  var query = req.params.query;
  const data = await search(query);
  res.json(data);
});

app.get("/watch/:link", async (req, res) => {
  var link = req.params.link;
  const magLink = await getmagLink(link);
  console.log(magLink);
  var engine = torrentStream(magLink, {
    uploads: 3,
    connections: 30,
    path: DIR
  });
  engine.on("ready", () => {
    engine.files.forEach(async file => {
      if (file.name.endsWith(".mp4")) {
        console.log("filename:", file.name);
        var stream = file.createReadStream();
        res.writeHead(200, { "Content-Type": "video/mp4" });
        stream.pipe(res);
      }
    });
  });
});
