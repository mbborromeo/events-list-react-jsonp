import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        //this.getPageIndex = this.getPageIndex.bind(this);
        this.getTotalPages = this.getTotalPages.bind(this);

        console.log("Pagination props : ", this.props);
    }

    getTotalPages() {
        return this.props.totalPages;
    }

    /*
    getPageIndex() { //properties
        //console.log("!!!!!!! call to EventsList :: getPageIndex")
        //this.props.currentPageIndex(properties);
        return this.props.currentPageIndex;
    }
    */
    
    getNextPageIndex(properties) {
        const currentPageIndex = this.props.currentPageIndex; //properties
        const nextPageIndex = currentPageIndex + 1;
        const totalPages = this.getTotalPages();

        console.log("Pagination : getNextPageIndex :: currentPageIndex : ", currentPageIndex);
        console.log("Pagination : getNextPageIndex :: nextPageIndex : ", nextPageIndex);

        if( nextPageIndex < totalPages ) {
            return nextPageIndex;
        } else {
            return totalPages;
        }        
    }

    getPrevPageIndex() { //properties
        const currentPageIndex = this.props.currentPageIndex; //properties
        const prevPageIndex = currentPageIndex - 1;
        if( prevPageIndex >= 1 ) {
            return prevPageIndex;
        } else {
            return 1;
        }
    }

    render () {

        return (
            <div>
                <hr />
                        
                <Link 
                    to={'/page/' + 1 } 
                    //onClick={ (ev) => this.handleBeginningClick(ev) }                            
                    className={ this.props.currentPageIndex === 1 ? 'button page' + ' disabled' : 'button page' }
                >
                    &laquo; Start 
                </Link>&nbsp;

                <Link 
                    to={'/page/' + this.getPrevPageIndex() } 
                    className={ this.props.currentPageIndex === 1 ? 'button page' + ' disabled' : 'button page' }
                >
                    &lt; Prev
                </Link>&nbsp;

                Page { this.props.currentPageIndex } / { this.getTotalPages() }
                &nbsp;

                <Link 
                    to={'/page/' + this.getNextPageIndex() } 
                    className={ this.props.currentPageIndex === this.getTotalPages() ? 'button page' + ' disabled' : 'button page' }
                >
                    Next &gt;
                </Link>&nbsp;

                <Link 
                    to={'/page/' + this.getTotalPages() } 
                    className={ this.props.currentPageIndex === this.getTotalPages() ? 'button page' + ' disabled' : 'button page' }
                >
                    End &raquo;                        
                </Link>
            </div>
        );
    }
}

export default Pagination;
