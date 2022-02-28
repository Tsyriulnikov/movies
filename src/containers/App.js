import React, {Component} from 'react';
import {connect} from "react-redux";
import {MoviesSearchForm} from "../components/movies-search-form";
import {
    searchMoviesRequest,
    setActivePage,
    setModalIsClose,
    setModalIsOpen,
    setSearchMoviesSuccess,
    setSearchValue,
} from "../actions/movies-action";
import {searchPlotRequest, setSearchPlotSuccess} from "../actions/plot-action"
import {MoviesGrid} from "../components/movies-grid";
import spinner from "../assets/ajax-loader.gif";
import Paginate from 'react-paginate';
import ReactModal from 'react-modal';
import './app.css'
import DEFAULT_PLACEHOLDER_IMAGE from "../assets/poster out.jpg";
ReactModal.setAppElement('#root');

class App extends Component {

    //search first page
    getMoviesSearch = (searchValue, activePage) => {
        this.props.searchMoviesRequestAction();
        this.props.setSearchMoviesSuccessAction(searchValue, activePage);
    };

//SEARCH next page
    handlePageClick = (data) => {
        let selected = data.selected + 1;
        this.props.setActivePageAction(selected);
        this.props.setSearchMoviesSuccessAction(this.props.searchValue, selected);
    };

    //search plot
    getPlotSearch = (title, year) => {
        console.log(title, year);
        this.props.searchPlotRequestAction();
        this.props.setSearchPlotSuccessAction(title, year);
        this.props.setModalIsOpenAction();
    };

    render() {
         const {
            searchValue, setSearchValueAction, movies, loading, error, totalPages, setActivePageAction,
            activePage, modalIsOpen, setModalIsCloseAction, plot
        } = this.props;
        const poster = plot.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : plot.Poster;

        //modal window syles
        const customStyles = {
            content: {
                position: 'absolute',
                top: '40px',
                left: '40px',
                right: '40px',
                bottom: '40px',
                border: '1px solid #ccc',
                background: '#aaa',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'
            }
        };

        return (
            <div id="app_main" className="app_main">
                <div className="search">
                    <MoviesSearchForm searchValue={searchValue}
                                      setSearchValue={setSearchValueAction}
                                      getMoviesSearch={this.getMoviesSearch}
                                      setActivePage={setActivePageAction}
                                      activePage={activePage}
                    />
                </div>
                <div id="react-paginate" className="paginate">
                    {typeof movies.Search !== 'undefined' ?
                        <Paginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        /> : ''
                    }
                </div>
                <div id="gallery-movies" className="gallery-movies">
                    {loading && !error ?
                        (<img className="spinner" src={spinner} alt="Loading spinner" width="100"/>)
                        : movies.Error ?
                            (<div className="errorMessage">{movies.Error}</div>)


                            : typeof movies.Search !== 'undefined' ?
                                movies.Search.map((order, index) => (<MoviesGrid
                                    title={order.Title}
                                    key={`${index} - ${order.Title}`}
                                    poster={order.Poster}
                                    year={order.Year}
                                    indexArrayMovie={index}
                                    getPlotSearch={this.getPlotSearch}
                                />))
                                : 'Insert searching word'}

                </div>

                <ReactModal
                    isOpen={modalIsOpen}
                    contentLabel=" "
                    style={customStyles}
                    onRequestClose={setModalIsCloseAction}
                >
                    <div>
                        <div className="col-xs-2 col-sm-2 col-md-2">
                            <h3 className="movie-title">  {plot.Title}</h3>
                            <div>
                                <img className="image_movie1"
                                     width="200"
                                     alt={plot.Title}
                                     src={poster}
                                />
                            </div>
                            <br></br>
                            <p>{plot.Year}</p>
                        </div>
                        <div className="col-xs-10 col-sm-10 col-md-10">
                            <table className="table  table-responsive">
                                <tbody>
                                <tr className="genre">
                                    <th>Genre</th>
                                    <td>{plot.Genre}</td>
                                </tr>
                                <tr className="actors">
                                    <th>Actors</th>
                                    <td>{plot.Actors}</td>
                                </tr>
                                <tr className="director">
                                    <th>Director</th>
                                    <td>{plot.Director}</td>
                                </tr>
                                <tr className="writer">
                                    <th>Writer</th>
                                    <td>{plot.Writer}</td>
                                </tr>
                                    <tr className="country">
                                    <th>Country</th>
                                    <td>{plot.Country}</td>
                                </tr>
                                <tr className="production">
                                    <th>Production</th>
                                    <td>{plot.Production}</td>
                                </tr>
                                <tr className="runtime">
                                    <th>RunTime</th>
                                    <td>{plot.Runtime}</td>
                                </tr>
                                <tr className="plot">
                                    <th>Plot</th>
                                    <td>{plot.Plot}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className="button-close btn btn-primary" onClick={setModalIsCloseAction}> Close
                        </button>
                    </div>
                </ReactModal>
            </div>


        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSearchValueAction: searchValue => dispatch(setSearchValue(searchValue)),
        setSearchMoviesSuccessAction: (searchValue, activePage) => dispatch(setSearchMoviesSuccess(searchValue, activePage)),
        searchMoviesRequestAction: () => dispatch(searchMoviesRequest()),
        setActivePageAction: activePage => dispatch(setActivePage(activePage)),
        setModalIsCloseAction: () => dispatch(setModalIsClose()),
        setModalIsOpenAction: () => dispatch(setModalIsOpen()),
        setSearchPlotSuccessAction: (searchPlotName, searchPlotYear) => dispatch(setSearchPlotSuccess(searchPlotName, searchPlotYear)),
        searchPlotRequestAction: () => dispatch(searchPlotRequest()),
    }
};


const mapStateToProps = store => {
    console.log(store);
    return {
        searchValue: store.movies.searchValue,
        movies: store.movies.movies,
        loading: store.movies.loading,
        error: store.movies.error,
        totalPages: store.movies.totalPages,
        activePage: store.movies.activePage,
        modalIsOpen: store.movies.modalIsOpen,
        plot: store.plot.plot,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)