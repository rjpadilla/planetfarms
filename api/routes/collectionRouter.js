const express = require('express')
const router = express.Router()
const { addcollection, getCollection, deleteCollection, getCollectionById, updateCollection, searchCollectionTitle } = require('../controllers/collectionController')
const { upload } = require('../helpers/filehelpers')

router.route('/').get(getCollection)
router.route('/add').post(upload.single('collection'), addcollection)
router.route('/search').get(searchCollectionTitle)
router.route('/:id').get(getCollectionById).delete(deleteCollection).put(updateCollection)

module.exports = router
