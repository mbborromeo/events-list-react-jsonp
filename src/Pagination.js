import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {RouteComponentProps, withRouter} from "react-router";
import { domainToASCII } from 'url';

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
        console.log("Pagination :: this.props : ", this.props)
        let currentPage = this.props.currentPageIndex;

        return (
            <div>
                <hr />

                <Link 
                    to={'/events/?page=' + 1 }                         
                    className={ currentPage === 1 ? 'button page disabled' : 'button page' }
                >
                    &laquo; Start 
                </Link>&nbsp;

                <Link 
                    to={'/events/?page=' + this.getPrevPageIndex() } 
                    className={ currentPage === 1 ? 'button page disabled' : 'button page' }
                >
                    &lt; Prev
                </Link>&nbsp;

                Page { currentPage } / { this.getTotalPages() }
                &nbsp;

                <Link 
                    to={'/events/?page=' + this.getNextPageIndex() } 
                    className={ currentPage === this.getTotalPages() ? 'button page disabled' : 'button page' }
                >
                    Next &gt;
                </Link>&nbsp;

                <Link 
                    to={'/events/?page=' + this.getTotalPages() } 
                    className={ currentPage === this.getTotalPages() ? 'button page disabled' : 'button page' }
                >
                    End &raquo;                        
                </Link>

            </div>
        );
    }
}

export default Pagination;
