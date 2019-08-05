import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { setVisibleDialogContentImage } from "../../../Actions/Actions.js";
import { ResizableBox } from "react-resizable";
import FittedImage from "react-fitted-image";

import {GetMediaByType} from '../../../utils';
import ReactPlayer from "react-player";

class FormDialog extends Component {
  state = {
    width: 550,
    height: 330,
    lastBlobUrl: null,
    content: "...",
    loading: false
  };

  componentDidUpdate() {
    if (this.props.blobUrl !== this.state.lastBlobUrl) {
      this.setState({
        lastBlobUrl: this.props.blobUrl
      });
      this.setState({
        loading: true
      });
    }
  }

  render() {
    const { handleClose, open } = this.props;
    return (
      <ResizableBox
        className="box"
        axis="both"
        width={this.state.width}
        height={this.state.height}
      >
        <div style={{ marginLeft: "1em" }}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-content"
            maxWidth={false}
          >
            <DialogTitle id="form-dialog-content">Viewing file </DialogTitle>
            <DialogContent>
              { this.props.blobUrl===null?null:<FittedImage
                fit="contain"
                loader={<div>Loading</div>}
                onLoad={(...args) => console.log(...args)}
                onError={(err) => console.log(err)}
                src={this.props.blobUrl}
              />}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary" type="button">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ResizableBox>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.visibleDialogContentImage,
    blobUrl: state.fileContentBlobUrl
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClose: event => {
      dispatch(setVisibleDialogContentImage(false));
    },
    handleOpen: event => {
      dispatch(setVisibleDialogContentImage(true));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDialog);
