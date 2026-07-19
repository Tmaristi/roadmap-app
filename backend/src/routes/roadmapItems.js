const express = require('express');
const router = express.Router()
const { getAllRoadmapItems, getRoadmapItem,createRoadmapItem, updateRoadmapItem, deleteRoadmapItem } = require('../controllers/roadmapItems')

router.get('/', getAllRoadmapItems )

router.get('/:id', getRoadmapItem)

router.post('/', createRoadmapItem)

router.put('/:id', updateRoadmapItem)

router.delete('/:id', deleteRoadmapItem)

module.exports = router