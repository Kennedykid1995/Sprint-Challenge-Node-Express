const express = require("express");
const projects = require("./data/helpers/projectModel");
const actions = require("./data/helpers/actionModel");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/projects", (req, res) => {
  projects
    .get()
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error Getting Projects" });
    });
});

server.get("/actions", (req, res) => {
  actions
    .get()
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error Getting Actions " });
    });
});

server.get("/actions/:id", (req, res) => {
  const id = req.params.id;
  actions
    .get(id)
    .then(singleAction => {
      if (singleAction === 0) {
        res.status(404).json({ message: "No action with that ID" });
        return;
      }
      res.json(singleAction);
    })
    .catch(err => {
      console
        .log("error", err)
        .res.status(500)
        .json({ message: "Error getting ID" });
    });
});

server.delete("/projects/:id", (req, res) => {
  const id = req.params.id;
  projects
    .remove(id)
    .then(removeProject => {
      if (removeProject === 0) {
        res.status(404).json({ message: "No Project with that ID" });
        return;
      } else {
        res.json({ success: "Project Deleted" });
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error deleting Project" });
      return;
    });
});
server.delete("/actions/:id", (req, res) => {
  const id = req.params.id;
  actions
    .remove(id)
    .then(removeAction => {
      if (removeAction === 0) {
        res.status(404).json({ message: "No action with that ID" });
        return;
      } else {
        res.json({ success: "Action Deleted" });
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error deleting Action" });
      return;
    });
});

server.post("/projects", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  if (description.length === 0) {
    res.status(400).json({ message: "Name must be entered" });
  }
  if (name.length === 0) {
    res.status(400).json({ message: "Description must be entered" });
  }
  projects
    .insert({ name, description })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error posting" });
      return;
    });
});

server.post("/actions", (req, res) => {
  const description = req.body.description;
  if (description.length === 0) {
    res.status(400).json({ message: "Description must be entered" });
  }
  console.log(description);
  actions
    .insert({ description })
    .then(response => {
      res.json(response);
      console.log("fbek")
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error posting" });
      return;
    });
});

server.put("/projects/:id", (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => res.status(500).json({ message: "Update Failed" }));
});
server.put("/actions/:id", (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => res.status(500).json({ message: "Update Failed" }));
});

server.listen(4001, () => console.log("server 4001 started"));
