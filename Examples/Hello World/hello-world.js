//
// hello-world.js
//
// This is a simple example of using ChemDraw JavaScript API.
//
// Copyright (c) 2017-2023 Revvity Signals Software, Inc. All rights reserved.

// ESLint configuration
/* global ChemDrawAPI */

function onLoadBody() {
  var messageBox = document.getElementById("message-box");
  messageBox.innerHTML = "Using ChemDraw API " + ChemDrawAPI.version;
}
