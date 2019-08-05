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
        const PaginatorBar=()=>{
            return (
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.allPages}
                    marginPagesDisplayed={2}
                    onPageChange={this.props.handleClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            );
        };
        return <div className='FileListContainer'>
                <div className="FileList">
                    { this.props.loading ? 
                        <Loader /> : 
                        fileListComponent.length ? fileListComponent: <FileListEmptyMessage />
                    }
                </div>
            {this.props.use_paging? PaginatorBar():null}
        </div>
    }
}
const mapStateToProps = (state) => {
    const filteredList = state.fileList.filter(
        file => state.fileListFilter ? file.name.toLocaleLowerCase().match(state.fileListFilter.toLocaleLowerCase()) : true
    );
    let pagedList=[];
    let allItems=filteredList.length;
    let index=state.user_settings.currentPage;
    let perPage=state.user_settings.itemsPerPage;
    let allPages=Math.floor(allItems/perPage);

    pagedList=
        allItems<(index*perPage+perPage)?
            filteredList.slice(index*perPage,allItems-index*perPage):
            filteredList.slice(index*perPage,index*perPage+perPage);
    return {
        use_paging:state.user_settings.usePaging,
        allPages:allPages,
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


