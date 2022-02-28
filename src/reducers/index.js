import { combineReducers } from 'redux'
import { moviesReducer} from './movies-reducer'
import { plotReducer} from './plot-reducer'
export const rootReducer = combineReducers({
    movies: moviesReducer,
    plot: plotReducer,
})