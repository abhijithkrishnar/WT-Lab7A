const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger("dev"));
server.use(express.json());

// Routes
server.get("/do_a_random", (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, "public");
server.use(express.static(publicServedFilesPath));
var story;

server.post("/itc505/lab7", (req, res) => {
  const { input1, input2, input3, input4, input5, input6, Game } = req.body;

  if (Game === "Ethereal-Affections") {
    story = ` Dear ${input1},

In your radiant presence, I find ${input2} joy and boundless inspiration. Your laughter, a melody that echoes through the halls of ${input3}, fills my heart with ${input4}. From the depths of my soul, I offer my sincerest ${input6} and cherish the moments shared amidst ${input5} and ${input5}. Together, let us weave tales of ${input2} adventures and explore the mysteries of ${input3}.
`;
  } else if (Game === "Quest-for-Truth") {
    story = `Amidst the tapestry of ${input1} hues and the whispers of ${input2}, a seeker of ${input3} truths embarks on a quest. Through ${input4} and ${input5}, this intrepid explorer unravels the secrets hidden within ${input6} and discovers the essence of ${input2}. With each step, the traveler embraces the ${input1} beauty of the world and finds solace in the embrace of ${input6}.
`;
  }

  // Form your story using the inputs

  // Redirect to another page and send story as query parameter
  //res.redirect(`/itc505/lab7/story?story=${encodeURIComponent(story)}`);
  res.json({
    redirectUrl: `/itc505/lab7/story?story=${encodeURIComponent(
      story
    )}&game=${encodeURIComponent(Game)}`,
  });
});

server.get("/itc505/lab7/story", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "itc505", "lab7", "story.html"));
});
// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 8080;
if (process.argv[2] === "local") {
  port = process.env.PORT || 8080;
}

server.listen(port, () => console.log("Ready on localhost!"));
