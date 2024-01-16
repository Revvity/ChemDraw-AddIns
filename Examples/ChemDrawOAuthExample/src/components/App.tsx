//
// App.tsx
//
// Copyright © 2019-2023 Revvity Signals Software, Inc. All rights reserved.
//

import * as React from "react";
import { Button } from "reactstrap";
import UserInfo from "./UserInfo";

import dropboxImage from "../images/dropbox.svg";
import "./App.css";

declare var ChemDrawAPI: any;

interface IAppState {
  accessToken: string;
}

class App extends React.Component<any, IAppState> {
  public state: IAppState = { accessToken: "" };

  private appKey: string = "";

  public render() {
    if (this.state.accessToken.length > 0) {
      return <UserInfo accessToken={this.state.accessToken} />;
    } else {
      return (
        <div className="container-fluid text-center mt-5">
          <div className="row m-5">
            <div className="col">
              <p>Connect to Dropbox to see account information and files</p>
              <img
                src={dropboxImage}
                alt="Dropbox"
                className="img-thumbnail"
                height="100px"
                width="100px"
              />
            </div>
          </div>
          <div className="row m-4 justify-content-center">
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="appKey">Dropbox app-key</label>
                <input
                  onChange={this.appKeyValueChanged}
                  type="text"
                  className="form-control"
                  id="appKey"
                  aria-describedby="appKeyHelp"
                  placeholder="Enter your Dropbox app-key"
                />
                <small className="form-text text-muted">
                  The app-key for your application can be found in Dropbox's App
                  Console
                </small>
              </div>
            </div>
          </div>
          <div className="row m-5">
            <div className="col">
              <Button color="primary" onClick={this.connectToDropbox}>
                Connect to Dropbox
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }

  private connectToDropbox = () => {
    if (this.appKey.length === 0) {
      alert("Dropbox app-key must be provided");
      return;
    }

    // Register a callback function with ChemDraw
    const callbackKey = ChemDrawAPI.registerURLTriggeredCallback(
      this.onCallback
    );

    // Construct a URL for authorization containing the callback key
    const dropboxOAuthUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${this.appKey}&response_type=token&redirect_uri=com.revvity.chemdraw.addin:///&state=${callbackKey}`;

    // Open the URL in external browser to authorize
    ChemDrawAPI.openURLInDefaultBrowser(dropboxOAuthUrl);

    // To run in browser, comment out the lines above and uncomment the one below
    // Replace the DROPBOX_ACCESS_TOKEN with your own token gotten from Dropbox
    // this.onCallback('test:///#access_token=DROPBOX_ACCESS_TOKEN&state=test');
  };

  /**
   * Gets called by Dropbox service on success with a URL string similar to
   * "YOUR_ENDPOINT:///#access_token=xxxxxxx&state=yyyyyy..."
   */
  private onCallback = (arg: string) => {
    // Break the URL into key value pairs and extract access token
    const fragment = arg.substring(arg.indexOf("#") + 1);
    const keyValueArray = fragment.split("&").map((pair) => pair.split("="));

    const resultMap = new Map();
    keyValueArray.forEach(([key, value]) => resultMap.set(key, value));

    this.setState({
      accessToken: resultMap.get("access_token"),
    });
  };

  private appKeyValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
    this.appKey = e.currentTarget.value;
  };
}

export default App;
