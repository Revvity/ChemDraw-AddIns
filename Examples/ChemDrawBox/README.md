# ChemDrawOAuthExample
This is an example add-in that shows how to authorize an application using OAuth. It uses Dropbox as the identity provider. The add-in demonstrates the use of `registerURLTriggeredCallback` and `openURLInDefaultBrowser` APIs to execute the authorization workflow.

This add-in is written in TypeScript and uses React. It also uses Bootstrap and Reactstrap libraries.

To install all required modules run the following command  
`npm install` 

To build the add-in, run:  
`npm run build`

> Note that OAuth requires a client-id which in the Dropbox's case is the _App-Key_ of the Dropbox app that authorizes. (See App Console here https://www.dropbox.com/developers). This _App-Key_ needs to be set in the application by replacing **YOUR_CLIENT_ID** in code.

Once the build completes successfully, the _build_ folder will contain an _index.html_ file and a _static_ folder that contains the compiled CSS and JavaScript code. In order to create an add-in bundle, the following needs to be zipped into one archive:
* _index.html_
* _static_ folder
* Add-in metadata file

Change the zipped archive extension to _.chemdrawaddin_
