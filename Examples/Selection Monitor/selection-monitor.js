//
// selection-monitor.js
//
// This is an example of using ChemDraw Add-in API to get the selection in a document.
//
// Copyright (c) 2018-2022 PerkinElmer, Inc. All rights reserved.

// ESLint configuration
/* global ChemDrawAPI */

function showSelection() {
    var messageBox = document.getElementById('message-box');
    if (ChemDrawAPI.activeDocument.selection.isEmpty()) {
        messageBox.innerHTML = 'Please select a structure';
    }
    else {
        messageBox.innerHTML = ChemDrawAPI.activeDocument.selection.getSVG({
            transparent: true,
            scalePercent: 100,
            borderSizeInPixels: 5
        });
    }
}

function onLoadBody() {
    ChemDrawAPI.window.resizeTo(400, 480);
    showSelection();
}

ChemDrawAPI.activeDocument.selection.onChange(function () {
    showSelection();
});