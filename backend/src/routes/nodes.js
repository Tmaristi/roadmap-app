const express = require('express');
const router = express.Router()
const { getAllNodes,getChildrenById,getNodeById,createNode, deleteNode} = require('../controllers/nodes')

router.get('/', getAllNodes )

router.get('/:id/children', getChildrenById)

router.get('/:id', getNodeById)

router.post('/', createNode)

router.delete('/:id', deleteNode)

module.exports = router