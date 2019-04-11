import { INCREMENT_LIKE } from './actions';

export interface McAppState {
    likeCounter: number;
}

export const initialState: McAppState = {
    likeCounter: 0
}

export function rootReducer(state: McAppState, action): McAppState {
    switch (action.type) {
        case INCREMENT_LIKE:
            return {
                likeCounter: state.likeCounter + 1
            }
    }
    return state;
}