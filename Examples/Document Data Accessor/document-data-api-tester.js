//
// document-data-api-tester.js
//
// ChemDraw JavaScript add-in example that demonstrates the usage of ChemDraw
// JavaScript API for adding and getting data in the active document.
// The supported data formats are Base64 CDX, CDXML, PNG, InChI, InChIKey,
// MolV2000, MolV3000, RXNV2000, RXNV3000, and SMILES.
//
// Copyright (c) 2017 PerkinElmer, Inc. All rights reserved.

// ESLint configuration
/* global ChemDrawAPI, $ */

$(function() {
    function resizeWindowToContent() {
        // We use a fixed width and fit to the height of our content
        ChemDrawAPI.window.resizeTo(800, $('#add-in-content').height());
    }

    function setText(text) {
        $('#text-data').val(text);
        resizeWindowToContent();
    }

    function setImage(base64Image) {
        $('#image-data').attr('src', 'data:image/png;base64,' + base64Image);

        $('#image-data').on('load', function() {
            resizeWindowToContent();
        });
    }

    function doGetPNGBase64Encoded(pngType) {
        switch (pngType) {
        case 'png-default':
            // Set the PNG options with default values
            setImage(ChemDrawAPI.activeDocument.getPNGBase64Encoded({
                transparent: true,
                scalePercent: 100,
                borderSizeInPixels: 0
            }));
            break;

        case 'png-scaled-150': 
            // Set all PNG options
            setImage(ChemDrawAPI.activeDocument.getPNGBase64Encoded({
                transparent: true,
                scalePercent: 150,
                borderSizeInPixels: 0
            }));
            break;

        case 'png-scaled-75': 
            // Setting only scalePercent and other options get the default value (transparent: true, borderSizeInPixels: 0)
            setImage(ChemDrawAPI.activeDocument.getPNGBase64Encoded({
                scalePercent: 75
            }));
            break;

        case 'png-with-background':
            setImage(ChemDrawAPI.activeDocument.getPNGBase64Encoded({
                transparent: false,
                scalePercent: 100,
                borderSizeInPixels: 0
            }));
            break;

        case 'png-with-border':
            setImage(ChemDrawAPI.activeDocument.getPNGBase64Encoded({
                transparent: false,
                scalePercent: 100,
                borderSizeInPixels: 100
            }));
            break;

        default:
            alert('Getting PNG image with the selected settings is not supported');
        } 
    }

    function addData() {
        try {
            var documentData = $('#text-data').val();
            if (!documentData)
            {
                documentData = '';
            }

            switch ($('#data-format').val()) {
            case 'cdxml':
                ChemDrawAPI.activeDocument.addCDXML(documentData);
                break;

            case 'base64-cdx':
                ChemDrawAPI.activeDocument.addCDXBase64Encoded(documentData);
                break;

            case 'smiles':
                ChemDrawAPI.activeDocument.addSMILES(documentData);
                break;

            case 'inchi':
                ChemDrawAPI.activeDocument.addInChI(documentData);
                break;

            case 'molv2000':
                ChemDrawAPI.activeDocument.addMolV2000(documentData);
                break;

            case 'molv3000':
                ChemDrawAPI.activeDocument.addMolV3000(documentData);
                break;

            case 'mol':
                ChemDrawAPI.activeDocument.addMol(documentData);
                break;

            case 'rxnv2000':
                ChemDrawAPI.activeDocument.addRXNV2000(documentData);
                break;

            case 'rxnv3000':
                ChemDrawAPI.activeDocument.addRXNV3000(documentData);
                break;

            default:
                alert('Adding data as the selected format is not supported');
            }
        } catch (err) {
            alert(err.message);
        }
    }

    function getData() {
        try {
            switch ($('#data-format').val()) {
            case 'cdxml':
                setText(ChemDrawAPI.activeDocument.getCDXML());
                break;

            case 'base64-cdx':
                setText(ChemDrawAPI.activeDocument.getCDXBase64Encoded());
                break;

            case 'smiles':
                setText(ChemDrawAPI.activeDocument.getSMILES());
                break;

            case 'png-default':
            case 'png-scaled-150':
            case 'png-scaled-75':
            case 'png-with-background':
            case 'png-with-border':
                doGetPNGBase64Encoded($('#data-format').val());
                break;

            case 'inchi':
                setText(ChemDrawAPI.activeDocument.getInChI());
                break;

            case 'inchikey':
                setText(ChemDrawAPI.activeDocument.getInChIKey());
                break;

            case 'molv2000':
                setText(ChemDrawAPI.activeDocument.getMolV2000());
                break;

            case 'molv3000':
                setText(ChemDrawAPI.activeDocument.getMolV3000());
                break;

            case 'rxnv2000':
                setText(ChemDrawAPI.activeDocument.getRXNV2000());
                break;

            case 'rxnv3000':
                setText(ChemDrawAPI.activeDocument.getRXNV3000());
                break;

            default:
                alert('Getting data as the selected format is not supported');
            }
        } catch (err) {
            alert(err.message);
        }
    }

    $(document).ready(function() {
        resizeWindowToContent();

        $('#add-data-button').click(function() {
            addData();
        });

        $('#get-data-button').click(function() {
            getData();
        });

        $('#clear-button').click(function() {
            setText('');
            setImage('');
        });
    });

    function showText()
    {
        $('#image-content').hide();
        $('#text-content').show();
        resizeWindowToContent();
    }

    function showImage()
    {
        $('#text-content').hide();
        $('#image-content').show();

        $('#image-data').on('load', function() {
            resizeWindowToContent();
        });
    }

    $('#data-format').change(function(){
        setText('');
        setImage('');

        switch ($('#data-format').val()) {
        case 'png-default':
        case 'png-scaled-150':
        case 'png-scaled-75':
        case 'png-with-background':
        case 'png-with-border':
            $('#add-data-button').attr('disabled', 'disabled');
            $('#get-data-button').removeAttr('disabled');
            showImage();
            break;

        case 'inchikey':
            $('#add-data-button').attr('disabled', 'disabled');
            $('#get-data-button').removeAttr('disabled');
            showText();
            break;

        case 'mol':
            $('#add-data-button').removeAttr('disabled');
            $('#get-data-button').attr('disabled', 'disabled');
            showText();
            break;

        default:
            $('#add-data-button').removeAttr('disabled');
            $('#get-data-button').removeAttr('disabled');
            showText();
        }
    });
});