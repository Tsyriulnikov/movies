import React, {Component} from 'react'
import DEFAULT_PLACEHOLDER_IMAGE from "../assets/poster out.jpg";
import './movies-grid.css';

export class MoviesGrid extends Component {
    handleGetPlotSearch=()=>{
        this.props.getPlotSearch(this.props.title, this.props.year)
    };

    render() {
        const poster = this.props.poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : this.props.poster;
        return(
              <div id="gallery" className="gallery">
                  <div id={this.props.indexArrayMovie} className="movie" onClick={this.handleGetPlotSearch}>
                  <h1 className="badge">  {this.props.title}</h1>
                     <div>
                         <img className="image_movie"
                             width="200"
                             alt={this.props.title}
                             src={poster}
                         />
                     </div>

                     <p>({this.props.year})</p>
                 </div>
                  </div>
        )}
}
