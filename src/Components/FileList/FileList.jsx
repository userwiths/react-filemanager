import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import File from '../File/File.jsx'; 
import FileListEmptyMessage from './FileListEmptyMessage';
import Loader from '../Loader/Loader.jsx'; 
import './FileList.css';

import { setCurrentPage } from '../../Actions/Actions';

class FileList extends Component {
    render() {
        const fileListComponent = this.props.displayFiles.map((file, key) => {
            return (<File type={file.type} name={file.name} editable={file.editable} size={file.size} key={key} />);
        });

        return <div className="FileList">
            { this.props.loading ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : <FileListEmptyMessage />
            }
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={4}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={this.props.handleClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    }
}


const mapStateToProps = (state) => {
    const filteredList = state.fileList.filter(
        file => state.fileListFilter ? file.name.toLocaleLowerCase().match(state.fileListFilter.toLocaleLowerCase()) : true
    );
    let pagedList=[];
    let allItems=filteredList.length;
    let index=state.currentPage;
    let perPage=state.itemsPerPage;

    pagedList=
        allItems<(index*perPage+perPage)?
            filteredList.slice(index*perPage,allItems-index*perPage):
            filteredList.slice(index*perPage,index*perPage+perPage);
    return {
        displayFiles:pagedList,
        fileList: filteredList,
        loading: state.loading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => {
            dispatch(setCurrentPage(event.selected));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileList);


