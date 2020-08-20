import * as ActionTypes from './ActionTypes';
export const Leaders = (state= { isLoading: true,
    errMess: null,
    dishes:[]},action) => {
    switch (action.type){
        case ActionTypes.ADD_LEADERS:
            return  {...state, isLoading: false, errMess: null, dishes: action.payload};
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}
        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}