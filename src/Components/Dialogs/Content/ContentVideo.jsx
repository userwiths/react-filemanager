import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { setVisibleDialogContentVideo,nextItem,previousItem } from "../../../Actions/Actions.js";
import { ResizableBox } from "react-resizable";
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
    //console.log(this.props);
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
              <ReactPlayer url={this.props.blobUrl} controls={true}/>}
            </DialogContent>

            <DialogActions style={{justifyContent:"center"}}>
              <Button onClick={this.props.prevItem} color="primary" type="button">
                Prev
              </Button>
              <Button onClick={handleClose} color="primary" type="button">
                Close
              </Button>
              <Button onClick={this.props.nextItem} color="primary" type="button">
                Next
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
    open: state.visibleDialogContentVideo,
    blobUrl: state.fileContentBlobUrl
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClose: event => {
      dispatch(setVisibleDialogContentVideo(false));
    },
    handleOpen: event => {
      dispatch(setVisibleDialogContentVideo(true));
    },
    nextItem:event=>{
      dispatch(nextItem());
    },
    prevItem:event=>{
      dispatch(previousItem());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDialog);
