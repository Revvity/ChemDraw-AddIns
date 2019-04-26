import * as React from "react";
import { Button } from "reactstrap";
import DropboxAPI from "../common/DropboxAPI"

declare var ChemDrawAPI: any;

interface IUserInfoProps {
  accessToken: string
}

interface IUserInfoState {
  userInfoJSON: any
  fileInfoJSON: any
}

export default class UserInfo extends React.Component<IUserInfoProps, IUserInfoState> {

  public state: IUserInfoState = { userInfoJSON: null, fileInfoJSON: null }

  private dropboxAPI: DropboxAPI;

  constructor(props: IUserInfoProps) {
    super(props);

    this.dropboxAPI = new DropboxAPI(this.props.accessToken);
  }

  public componentDidMount() {
    // Ask Dropbox for user's profile information
    this.dropboxAPI.getUserInfo().then((result) => {
      this.setState({
        userInfoJSON: JSON.parse(result)
      });
    });

    // Ask Dropbox for user's files
    this.dropboxAPI.getUserFiles().then((result) => {
      this.setState({
        fileInfoJSON: JSON.parse(result)
      });
    });
  }

  public render() {
    if ((this.state.userInfoJSON === null) || (this.state.fileInfoJSON === null)) {
      return (<div className="text-center m-1">Loading user information...</div>);
    }

    // Add a button for each file
    const fileArray: any[] = [];
    this.state.fileInfoJSON.entries.forEach((i: any) => {
      fileArray.push(<Button className="m-1" size="sm" color="primary" onClick={this.onFileClick(i.path_lower)}>{i.name}</Button>);
    });

    return (
      <div className="container-fluid text-center m-1">
        <div className="row">
          <div className="col">
            <h4>User Information</h4>
          </div>
        </div>
        <div className="row m-2">
          <div className="col">
            <img src={this.state.userInfoJSON.profile_photo_url} alt="Profile photo" className="img-thumbnail" height="150px" width="150px" />
          </div>
        </div>
        <div className="row m-2">
          <div className="col">
            {this.state.userInfoJSON.name.display_name}
          </div>
        </div>
        <div className="row m-1">
          <div className="col">
            {this.state.userInfoJSON.email}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h6>Files</h6><hr />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex flex-wrap">
              {fileArray}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Called when one of the file button is clicked
   */
  private onFileClick = (filePath: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    // Download file from Dropbox and add to ChemDraw
    this.dropboxAPI.downloadFile(filePath).then((result) => {
      ChemDrawAPI.activeDocument.addCDXML(result);
    });
  }
}
