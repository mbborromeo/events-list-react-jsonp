import React, { Component } from 'react';

class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChangeKeyword(event){
        this.props.onChangeKeyword(event.target.value);
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.onCancel();
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
                            value={ this.props.filterKeyword }
                            onChange={ this.handleChangeKeyword }
                            placeholder="eg Band"
                        />
                    </label>
                    <input type="submit" value="Search"  />
                    <input type="reset" value="Cancel" onClick={ this.handleCancel } />
                </form>
                <br /><br />
            </div>
        );
    }
}

export default SearchField;
