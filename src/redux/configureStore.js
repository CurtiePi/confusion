import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigurationStore = () => {
    const store = createStore(
        Reducer, 
        initialState
    );

    return store;
}
