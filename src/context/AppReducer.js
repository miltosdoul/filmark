export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "UPDATE_MOVIE_IN_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.map((el) =>
          el.id == action.payload.id ? action.payload : el
        ),
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    case "UPDATE_MOVIE_IN_WATCHED":
      return {
        ...state,
        watched: state.watched.map((el) =>
          el.id == action.payload.id ? action.payload : el
        ),
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlist: [action.payload, ...state.watchlist],
      };
    case "MOVE_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    case "REMOVE_MOVIE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    case "SAVE_SEARCH_TO_STATE":
      return {
        ...state,
        currSearch: action.payload,
      };

    case "SET_ACTIVE_REGION":
      return {
        ...state,
        region: action.payload,
      };
    case "SAVE_POPULAR_TO_STATE":
      return {
        ...state,
        popularMovies: action.payload,
      };
    default:
      return state;
  }
};
