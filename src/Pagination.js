import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.getPageIndex = this.getPageIndex.bind(this);
    }

    getTotalPages() {
        return this.props.totalPages;
    }

    getPageIndex(properties) {
        //console.log("!!!!!!! call to EventsList :: getPageIndex")
        this.props.currentPageIndex(properties);
    }
    
    getNextPageIndex(properties) {
        const currentPageIndex = this.getPageIndex(properties);
        const nextPageIndex = currentPageIndex + 1;
        const totalPages = this.getTotalPages();

        if( nextPageIndex < totalPages ) {
            return nextPageIndex;
        } else {
            return totalPages;
        }        
    }

    getPrevPageIndex(properties) {
        const currentPageIndex = this.getPageIndex(properties);
        const prevPageIndex = currentPageIndex - 1;
        if( prevPageIndex >= 1 ) {
            return prevPageIndex;
        } else {
            return 1;
        }
    }

    /*
    componentDidMount() {
        console.log("Pagination: componentDidMount!!!!!!!!!!!!");
    }
    */

    render () {
        return (
            <div>
                <hr />
                        
                <Link 
                    to={'/page/' + 1 } 
                    //onClick={ (ev) => this.handleBeginningClick(ev) }                            
                    className={ this.getPageIndex(this.props) === 1 ? 'button page' + ' disabled' : 'button page' }
                >
                    &laquo; Start 
                </Link>&nbsp;

                <Link 
                    to={'/page/' + this.getPrevPageIndex(this.props) } 
                    className={ this.getPageIndex(this.props) === 1 ? 'button page' + ' disabled' : 'button page' }
                >
                    &lt; Prev
                </Link>&nbsp;

                Page { this.getPageIndex(this.props) } / { this.getTotalPages() }
                &nbsp;

                <Link 
                    to={'/page/' + this.getNextPageIndex(this.props) } 
                    className={ this.getPageIndex(this.props) === this.getTotalPages() ? 'button page' + ' disabled' : 'button page' }
                >
                    Next &gt;
                </Link>&nbsp;

                <Link 
                    to={'/page/' + this.getTotalPages() } 
                    className={ this.getPageIndex(this.props) === this.getTotalPages() ? 'button page' + ' disabled' : 'button page' }
                >
                    End &raquo;                        
                </Link>
            </div>
        );
    }
}

export default Pagination;
