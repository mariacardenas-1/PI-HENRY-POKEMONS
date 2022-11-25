const { Router } = require('express');
const { h, getPokemon, detailPokemon, createPokemon } = require('../controllers/pokemonController')
const { getTypes, dbTypes } = require('../controllers/typeController')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', h)
router.get('/pokemons', getPokemon)
router.get('/pokemons/:id', detailPokemon)
router.post('/pokemons', createPokemon)
router.get('/types', getTypes)
router.get('/dbtypes' , dbTypes)

module.exports = router;
