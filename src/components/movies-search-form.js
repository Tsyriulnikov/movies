import React, {Component} from 'react'


export class MoviesSearchForm extends Component {


    inputSearchChanges = e => {
        this.props.setSearchValue(e.target.value);
    };


    callSearchFunction = e => {
        e.preventDefault();
        let activePageBegin = 1;
        this.props.setActivePage(activePageBegin);
        this.props.getMoviesSearch(this.props.searchValue, activePageBegin);

    };

    render() {
        return (
            <form className="search">
                <input
                    value={this.props.searchValue}
                    onChange={this.inputSearchChanges}
                    type="text"
                    autoFocus={true}
                />

                <input className="btn btn-primary" onClick={this.callSearchFunction} type="submit" value="SEARCH"/>
            </form>
        )
    }
}