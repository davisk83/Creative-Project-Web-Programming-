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

// JSON of the president's profile
let profile = {
  "name": "Davis Kurniawan",
  "age": "27",
  "nationality": "Mexican"
};

/** This is the endpoint to retrieve the president's greeting message in the form of plain text. */
app.get("/greet", function(req, res) {
  try {
    res.set("Content-Type", "text/plain");
    res.send("Hello, VOTE FOR ME NOW!");
  } catch (error) {
    res.status(400);
    handleError();
  }
});

/** This is the endpoint to retrieve the president's profile in the form of JSON object. */
app.get("/profile", function(req, res) {
  res.set("Content-Type", "application/json");
  res.json(profile);
});

/** Handles and shows error message. */
function handleError() {
  let userInterface = id("user-interface");
  let errorNotice = document.createElement("p");
  errorNotice.textContent = "ERROR! Please try again!";
  errorNotice.id = "error";
  userInterface.appendChild(errorNotice);
}

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} name - element ID.
 * @returns {object} - DOM object associated with id.
 */
function id(name) {
  return document.getElementById(name);
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
