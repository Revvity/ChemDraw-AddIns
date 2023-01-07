//
// DropboxAPI.ts
//
// Copyright © 2019-2023 PerkinElmer, Inc. All rights reserved.
//

export default class DropboxAPI {
  private accessToken: string;
  private accessTokenErrorMessage: string = "Access token is invalid";

  constructor(inAccessToken: string) {
    this.accessToken = inAccessToken;
  }

  /**
   * Get Dropbox's user information
   */
  public getUserInfo(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.accessToken.length === 0) {
        reject(this.accessTokenErrorMessage);
      } else {
        // Get user information
        const request = new XMLHttpRequest();
        request.open(
          "POST",
          "https://api.dropboxapi.com/2/users/get_current_account"
        );

        request.setRequestHeader("Authorization", "Bearer " + this.accessToken);
        request.onload = () => {
          resolve(request.responseText);
        };

        request.send();
      }
    });
  }

  /**
   * Get user's files as JSON
   */
  public getUserFiles(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.accessToken.length === 0) {
        reject(this.accessTokenErrorMessage);
      } else {
        const request = new XMLHttpRequest();
        request.open("POST", "https://api.dropboxapi.com/2/files/list_folder");
        request.setRequestHeader("Authorization", "Bearer " + this.accessToken);
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = () => {
          resolve(request.responseText);
        };

        request.send(JSON.stringify({ path: "" }));
      }
    });
  }

  /**
   * Downloads a file from Dropbox
   * @param filePath The path of file to download
   */
  public downloadFile(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.accessToken.length === 0) {
        reject(this.accessTokenErrorMessage);
      } else {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open(
          "POST",
          "https://content.dropboxapi.com/2/files/download"
        );

        httpRequest.setRequestHeader(
          "Authorization",
          "Bearer " + this.accessToken
        );
        httpRequest.setRequestHeader(
          "Dropbox-API-Arg",
          JSON.stringify({ path: filePath })
        );

        httpRequest.onload = () => {
          resolve(httpRequest.responseText);
        };

        httpRequest.send();
      }
    });
  }
}
