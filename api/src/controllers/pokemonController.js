const { Pokemon, Type, Pokemontype } = require('../db.js')
const axios = require('axios')
const { randomUUID } = require('crypto')
const { NUMBER } = require('sequelize')
const { receiveMessageOnPort } = require('worker_threads')
const { Console } = require('console')
require('dotenv').config()

const h = async(req, res) => {
    res.json('h')
}


const getPokemon = async(req, res) => {
    const { name } = req.query
    if(name){
        try{
            const searchName= name.toLowerCase()
        
            const allPokemon = await Pokemon.findAll()
            const db = allPokemon.filter(el => el.name.toLowerCase() === searchName)
            if(db.length > 0)  res.json(db)
            if(db.length === 0) {
                const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
                const data = await api.data
                    const pokemonTypes = []
                    data.types.forEach(t => {
                        pokemonTypes.push(t.type)
                    })
    
                    const dataPokemon = {
                            image: data.sprites.other.dream_world.front_default,
                            name: data.species.name,
                            types: pokemonTypes,
                            id: data.id,
                        }
                    
                    res.json(dataPokemon)
            }
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }else {
        try{
            const api = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40')
            const listPokemons = api.data.results
            const pokemonEndpoints = listPokemons.map(async poke=> {
                return await axios.get(poke.url)
            })
            let resultado = await Promise.all(pokemonEndpoints)
             const pokemonData = resultado.map(pokemon=> {
                return {
                    name: pokemon.data.species.name,
                    image: pokemon.data.sprites.other.dream_world.front_default,
                    // types: pokemon.data.types.map(tipo => tipo.type.name),}
                    types: pokemon.data.types.map(tipo=> tipo.type),
                    id: pokemon.data.id,
                    attack: pokemon.data.stats[1].base_stat
                }
            })

            const db = await Pokemon.findAll({
                include: [{
                    model: Type,
                    through : {
                        attributes: []
                    }
                }]
            })
            const allPokemons = db.concat(pokemonData)
             res.json(allPokemons)
        }catch(error){
            return res.status(500).json({message: error.message})
        }
    }
}

const getAttackPokemon = (api) =>{
    return api.stats[1].base_stat
}

const getSpeedPokemon = (api) =>{
    return api.stats[5].base_stat
    
}

const getLifePokemon = (api) =>{
    return api.stats[0].base_stat
    
}

const getDefensePokemon = (api) =>{
    return api.stats[2].base_stat
    
}

const detailPokemon = async(req, res) => {
    const { id } = req.params
    try{
        const nId = Number(id)
        const db = await Pokemon.findAll({
            include: [{
                model: Type,
                through : {
                    attributes: []
                }
            }]
        })
        const dbId = db.filter(el=> el.id === id)
        if(dbId.length > 0){
            const dbIdValue = dbId[0].dataValues
            const detail = {
                image: dbIdValue.image,
                name: dbIdValue.name,
                type: dbIdValue.types,
                height: dbIdValue.height,
                weight: dbIdValue.weight,
                attack: dbIdValue.attack,
                speed: dbIdValue.speed,
                life: dbIdValue.life,
                defense: dbIdValue.defense,
                id: id,
            }
            // console.log({detail})
        res.json(detail)
        }
        if(dbId.length === 0){

                const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const apiRes = await api.data
            const resultado = {
                name: apiRes.name,
                image: apiRes.sprites.other.dream_world.front_default,
                type: apiRes.types.map(el=> {
                    return el.type.name
                }),
                id: apiRes.id,
                height: apiRes.height,
                weight: apiRes.weight,
                attack: getAttackPokemon(apiRes),
                defense: getDefensePokemon(apiRes),
                speed: getSpeedPokemon(apiRes),
                life: getLifePokemon(apiRes),
                id: id,
            }
        res.json(resultado)
        } 

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

const createPokemon = async(req, res) => {
    const { name, image, types, life, attack, defense, speed, height, weight } = req.body
    const pokemonId = randomUUID()
    try{
        const newPokemon = await Pokemon.create({
            id: pokemonId,
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            myList: true,
        })

        types.forEach( t => {
            Pokemontype.create({
                typeId: t.id,
                pokemonId: pokemonId,
            })
        })
        res.json(newPokemon)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { h, getPokemon, detailPokemon, createPokemon }