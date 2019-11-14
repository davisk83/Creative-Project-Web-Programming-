/*
 * Name: Davis Kurniawan
 * Date: November 13, 2019
 * Section: CSE 154 AE/Andrew Wolframs
 *
 * This is the JS to implement the UI for my presidential campaign page. It can show, generate, and
 * erase a number of fans that I have. It can also give free taco!
 */
"use strict";
(function() {
  const BASE_URL = "http://taco-randomizer.herokuapp.com/";

  window.addEventListener("load", init);

  /** Sets up event listener for the vote button. */
  function init() {
    id("show-fans").addEventListener("click", showFans);
    id("greet").addEventListener("click", requestGreeting);
    id("profile").addEventListener("click", requestProfile);
  }

  /** Request a greeting message from the local API. */
  function requestGreeting() {
    fetch("greet")
      .then(checkStatus)
      .then(resp => resp.text())
      .then(showGreeting)
      .catch(handleError);
  }

  /**
   * Shows the greeting message.
   * @param {String} response - a greeting message.
   */
  function showGreeting(response) {
    id("message").textContent = response;
    id("greet").disabled = true;
  }

  /** Request the president's profile from the local API. */
  function requestProfile() {
    fetch("profile")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(showProfile)
      .catch(handleError);
  }

  /**
   * Shows the president's profile.
   * @param {object} response - json object representing the president's profile.
   */
  function showProfile(response) {
    let name = gen("p");
    name.textContent = "Name: " + response.name;
    id("profile-box").appendChild(name);
    let age = gen("p");
    age.textContent = "Age: " + response.age;
    id("profile-box").appendChild(age);
    let nationality = gen("p");
    nationality.textContent = "Nationality: " + response.nationality;
    id("profile-box").appendChild(nationality);
    id("profile").disabled = true;
  }

  /** Shows a notice and sets a timer to show the page instruction. */
  function addTimer() {
    showInstructions("The Instructions will appear in 3 seconds!");
    id("instructions").disabled = true;
    setTimeout(showInstructions, 3000, "Click become a fan button to show support! Otherwise," +
                 " click kill all the fans button to oppose! Don't forget to take free taco!");
  }

  /**
   * Shows the instruction on how to support the campaign.
   * @param {String} message - a message that wanted to be shown on the page.
   */
  function showInstructions(message) {
    let paragraph = qs("main");
    let notice = document.createElement("p");
    notice.textContent = message;
    paragraph.appendChild(notice);
  }

  /** Shows the voting user interface. */
  function showFans() {
    id("user-interface").classList.remove("hidden");
    id("add-fans").addEventListener("click", addFans);
    id("clear-fans").addEventListener("click", clearFans);
    id("instructions").addEventListener("click", addTimer);
    id("free-food").addEventListener("click", makeTacoRequest);
    id("taco-shell").addEventListener("click", makeShellRequest);
    id("show-fans").disabled = true;
    id("taco-shell").disabled = true;
    let userInterface = id("user-interface");
    let foodNotice = document.createElement("p");
    foodNotice.textContent = "FOOD AVAILABLE: ";
    userInterface.appendChild(foodNotice);
  }

  /** Takes and appends the taco name from the full taco AJAX API to the page.  */
  function makeTacoRequest() {
    let url = BASE_URL + "random/?full-taco=true";
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(getTaco)
      .catch(handleError);
  }

  /** Takes and appends the taco shell name from the AJAX Taco API to the page. */
  function makeShellRequest() {
    let url = BASE_URL + "random/";
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(getShell)
      .catch(handleError);
  }

  /**
   * Gets and shows a random shell name.
   * @param {object} response - json object representing a mixture of base layer, mixin, condiment,
   *                            seasoning, and shell.
   */
  function getShell(response) {
    let userInterface = id("user-interface");
    let tacoShell = document.createElement("p");
    tacoShell.textContent = "CHANGED: " + response.shell.name;
    userInterface.appendChild(tacoShell);
  }

  /**
   * Gets and shows a random taco name.
   * @param {object} response - json object representing a full taco with recipe.
   */
  function getTaco(response) {
    let userInterface = id("user-interface");
    let taco = document.createElement("p");
    taco.textContent = response.name;
    userInterface.appendChild(taco);
    id("taco-shell").disabled = false;
  }

  /** Shows support my adding a fan to the page. */
  function addFans() {
    let fansContainer = qs("#fans-container");
    let newFans = document.createElement("img");
    newFans.src = "stickman.jpg";
    newFans.alt = "Davis's Fan";
    fansContainer.appendChild(newFans);
  }

  /** Deletes/erases all the fans on the page. */
  function clearFans() {
    id("clear-fans").disabled = true;
    id("add-fans").disabled = true;
    id("taco-shell").disabled = true;
    id("free-food").disabled = true;
    id("fans-container").textContent = "";
  }

  /** Handles and shows error message coming from the API website. */
  function handleError() {
    let userInterface = id("user-interface");
    let errorNotice = document.createElement("p");
    errorNotice.textContent = "ERROR! Please try again later!";
    errorNotice.id = "error";
    userInterface.appendChild(errorNotice);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text.
   * @param {object} response - response to check for success/error.
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result.
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
