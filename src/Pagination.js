import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.getTotalPages = this.getTotalPages.bind(this);
    }

    getTotalPages() {
        return this.props.totalPages;
    }
    
    getNextPageIndex() {
        const currentPageIndex = this.props.currentPageIndex;
        const nextPageIndex = currentPageIndex + 1;
        const totalPages = this.getTotalPages();

        if( nextPageIndex < totalPages ) {
            return nextPageIndex;
        } else {
            return totalPages;
        }        
    }

    getPrevPageIndex() {
        const currentPageIndex = this.props.currentPageIndex;
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
