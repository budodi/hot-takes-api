const express = require('express');
const router = express.Router(); // creates express router

const auth = require('../authenticate/auth');
const multer = require('../authenticate/multer-config');

const sauceCtrl = require('../controllers/sauce');

// REGISTER ROUTES TO ROUTER

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);


module.exports = router;
