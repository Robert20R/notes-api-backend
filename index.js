const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

const request = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("--------------------");
  next();
};

app.use(request);

let notes = [
  {
    id: 1,
    content: "I have to suscribe to @midudev on YouTube.",
    date: "2019-05-30T17:30:31.098Z",
    importatn: true,
  },
  {
    id: 2,
    content: "I have to study the FullStack Bootcamp classes.",
    date: "2019-05-30T18:39:34.091Z",
    importatn: false,
  },
  {
    id: 3,
    content: "Review midudev JS challenges.",
    date: "2019-05-30T19:20:14.298Z",
    importatn: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  if (!note || !note.content) {
    return response.status(400).json({ error: "note.content is missing" });
  }

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  };

  notes = [...notes, newNote];

  response.status(201).json(newNote);
});

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unkown endpoint." });
};

app.use(unkownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
