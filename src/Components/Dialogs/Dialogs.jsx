import React from 'react';
import DialogContent from './Content/ContentImage';
import DialogEdit from './Edit/Edit.jsx';
import DialogCreateFolder from './CreateFolder/CreateFolder.jsx';
import DialogRename from './Rename/Rename.jsx';
import DialogMove from './Move/Move.jsx';
import DialogCopy from './Copy/Copy.jsx';
import DialogUploadFile from './UploadFile/UploadFile.jsx';
import DialogContentVideo from './Content/ContentVideo';

function Dialogs(props) {
    return (
        <div className="Dialogs">
            <DialogContent />
            <DialogContentVideo />
            <DialogEdit />
            <DialogCreateFolder />
            <DialogMove />
            <DialogCopy />
            <DialogRename />
            <DialogUploadFile />
        </div>
    );
}

export default Dialogs;
