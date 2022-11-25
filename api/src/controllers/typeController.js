const { Type } = require('../db')
const axios = require('axios');

const getTypes = async(req, res) => {
    try{
        const types= await Type.findAll()

        if(types.length === 0){
            const api = await (await axios.get('https://pokeapi.co/api/v2/type')).data.results
            let tipos = []
            const tipo = api.map(t => {
                    tipos.push(t.name)
                return null
            })
            let unique = [...new Set(tipos)]
            unique.forEach(el => {
                const newType = Type.create({
                    name: el,
                })
            })
            res.json('se obtuvo la data de la api')
        }else{
            res.json(types)
        }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

const dbTypes = async(req, res) => {
    try{
        const db = await Type.findAll()
        res.json(db)
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {getTypes, dbTypes}