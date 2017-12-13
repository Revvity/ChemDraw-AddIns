//
// hello-world.js
//
// This is a simple example of using ChemDraw JavaScript API.
//
// Copyright (c) 2017 PerkinElmer, Inc. All rights reserved.

// ESLint configuration
/* global ChemDrawAPI */

function onLoadBody() {
    var messageBox = document.getElementById('message-box');
    messageBox.innerHTML = 'Using ChemDraw API ' + ChemDrawAPI.version;
}