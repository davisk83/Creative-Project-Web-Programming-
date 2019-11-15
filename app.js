/*
 * Name: Davis Kurniawan
 * Date: November 13, 2019
 * Section: CSE 154 AE/Andrew Wolframs
 *
 * This is the JS of the server-side development. It is an API for the presidential campaign page.
 */
"use strict";

const express = require("express");
const app = express();

// President's greetings
let greetings = ["Hello, VOTE FOR ME NOW!!", "How are you doing?",
                 "I will make Mexico great again!", "You should VOTE for me!"];

// JSON of the president's profile
let profile = {
  "name": "Davis Kurniawan",
  "age": "27",
  "nationality": "Mexican"
};

/**
 * This is the endpoint to retrieve the president's action. "Greet" is the only
 * available action type at this moment, and it shows the president's greeting message.
 */
app.get("/action/:action", function(req, res) {
  let action = req.params.action;
  if (action === "greet") {
    res.set("Content-Type", "text/plain");
    res.send(getGreeting());
  } else {
    res.status(400).send("Incorrect action types!");
  }
});

/** This is the endpoint to retrieve the president's profile. */
app.get("/profile", function(req, res) {
  res.set("Content-Type", "application/json");
  res.json(profile);
});

/**
 * Gets a random president's greeting.
 * @return {string} - President's greeting message.
 */
function getGreeting() {
  return greetings[Math.floor(Math.random() * greetings.length)];
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
