import { 
    SEARCH_BY_QUERY,
    LOAD_POKEMONS,
    FILTER_BY_TYPE,
    ORDER_BY_AZ,
    ORDER_BY_ZA,
    ORDER_BY_MINOR_ATTACK,
    ORDER_BY_MAJOR_ATTACK,
    WITHOUT_ORDER,
    FILTER_CREATED_BY
    } from '../actions';

const initialState = {
    pokemons: [],
    filter: [],
    page: 1
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_BY_QUERY: {
            return {
                ...state,
                filter: [...action.payload],
                page: 1
            }
        }
        case LOAD_POKEMONS: {

            return {
                ...state,
                pokemons: action.payload,
                filter: [...action.payload],
            }
        }
        case FILTER_BY_TYPE: {
        const filtrar = ()=>{
            const pokemons = state.pokemons
            if(action.payload === 'Filter') return pokemons
            const filtrado = []
            const filtro = pokemons.filter(el => {
                el.types.filter(t =>{
                    if(t.name === action.payload){
                        filtrado.push(el)
                    }
                })
            })
            return filtrado
        }
            return {
                ...state,
                filter: filtrar()
            }
        }
        case ORDER_BY_AZ: {

            const a_zOrder = () =>{
                const pokemons = [...state.filter]
                return pokemons.sort(function(a, b){
                    if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                })
               
            }

            return {
                ...state,
                filter: a_zOrder()
            }
        }
        case ORDER_BY_ZA: {
            const z_aOrder = () =>{
                const pokemons = [...state.filter]
                return pokemons.sort((a, b) =>  b.name.localeCompare(a.name))
            }
            return {
                ...state,
                filter: z_aOrder()
            }
        }
        case ORDER_BY_MINOR_ATTACK: {
            const minorAttackOrder = ()=>{
                const pokemons = [...state.filter]
                return pokemons.sort((a, b) =>  a.attack - b.attack)
            }
            return {
                ...state,
                filter: minorAttackOrder()
            }
        }
        case ORDER_BY_MAJOR_ATTACK: {
            const majorAttackOrder = ()=>{
                const pokemons = [...state.filter]
                return pokemons.sort((a, b) =>  b.attack - a.attack)
            }
            return {
                ...state,
                filter: majorAttackOrder()
            }
        }
        case WITHOUT_ORDER: {
            return {
                ...state,
                filter: [...state.pokemons]
            }
        }
        case FILTER_CREATED_BY: {
           const getBySource = ()=>{
                if(action.payload === 'CreatedByMe') {
                    const pokemons = [...state.pokemons]
                    const mine = pokemons.filter(p=>{
                        const stringId = String(p.id)
                        return stringId.length > 5
                    })
                    return mine
                    

                }
                if(action.payload === 'Existing'){
                    const pokemons = [...state.pokemons]
                    const exist = pokemons.filter((p) => {
                        const stringId = String(p.id)
                        return stringId.length < 4}
                        )
                        return exist
                }
            }
           return {
            ...state,
            filter: getBySource()
           }
        }
        default: {
            return initialState
        }
    }
}

export default rootReducer