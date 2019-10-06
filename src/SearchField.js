import React, { Component } from 'react';

class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    }

    handleChangeKeyword(event){
        this.props.onChangeKeyword(event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render () {
        return (
            <div>
                <form onSubmit={ this.handleSubmit.bind(this) }>
                    <label>
                        Title: 
                        <input type="text" name="keyword"
                            //value={ this.props.filterKeyword }
                            onChange={ this.handleChangeKeyword }
                            placeholder="eg Band"
                        />
                    </label>
                    <input type="submit" value="Search"  />
                </form>
                <br /><br />
            </div>
        );
    }
}

export default SearchField;
