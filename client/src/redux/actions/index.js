import axios from 'axios';

 
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';
export const LOAD_POKEMONS = 'LOAD_POKEMONS';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const ORDER_BY_AZ = 'ORDER_BY_AZ'
export const ORDER_BY_ZA = 'ORDER_BY_ZA'
export const ORDER_BY_MINOR_ATTACK = 'ORDER_BY_MINOR_ATTACK'
export const ORDER_BY_MAJOR_ATTACK = 'ORDER_BY_MAJOR_ATTACK'
export const WITHOUT_ORDER = 'WITHOUT_ORDER'
export const FILTER_CREATED_BY = 'FILTER_CREATED_BY'


export const searchPokemon = (query) => {
    return async dispatch => {
        const result = await (await axios.get(`http://localhost:3001/pokemons?name=${query}`)).data
        dispatch({type: SEARCH_BY_QUERY, payload: [result]})
    };
}

export const loadPokemons = () => {
    return async function (dispatch) {
        fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .then(json =>{
           dispatch({ type: LOAD_POKEMONS , payload: json })
          })
        .catch(e => console.log(e));
        
      };
};

export const filterByType = (value) => {
    return  dispatch =>{
        dispatch({type: FILTER_BY_TYPE, payload: value})
    }
}

export const orderByAz = () =>{
    return dispatch => {
        dispatch({type: ORDER_BY_AZ})
    }
}

export const orderByZa = () =>{
    return dispatch => {
        dispatch({type: ORDER_BY_ZA})
    }
}

export const orderByMinorAttack = () =>{
    return dispatch => {
        dispatch({type: ORDER_BY_MINOR_ATTACK})
    }
}
export const orderByMajorAttack = () =>{
    return dispatch => {
        dispatch({type: ORDER_BY_MAJOR_ATTACK})
    }
}

export const withoutOrder =() =>{
    return dispatch => {
        dispatch({type: WITHOUT_ORDER})
    }
}

export const filterCreatedBy = (value) =>{
    return dispatch => {
        dispatch({type: FILTER_CREATED_BY, payload: value})
    }
}

