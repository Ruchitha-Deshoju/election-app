const express = require('express')
const router = new express.Router()
const Positions = require('../models/positions')

// Create 

router.post('/positions', async (req, res) => {
    console.log(req.body)
    const pos = new Positions(req.body)
    try {
        await pos.save()
        res.status(201).send(pos)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Reading 

router.get('/positions', async(req, res) => {
    try {
        const exitsPositions = await Positions.find({})
        res.status(200).json({
            message: "Positions fetched successfully",
            posts: exitsPositions
        })
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router
