const express = require('express')
const router = new express.Router()
const Participant = require('../models/participant-details')

// Creating

router.post('/participant', async (req, res) => {
    const position = req.body.position_name.toLowerCase()
    const details = req.body.participants_details
    try {
        const addDetails = { $push: { participants_details: details}}
        const person = await Participant.updateOne({ position_name: position }, addDetails, { new: true, runValidators: true})
        if(person.nModified === 0) {
            const user = new Participant(req.body)
            await user.save()
            return res.status(201).send(user)
        }
        res.send(person)
    } catch(e) {
        res.status(400).send(e)
    }
})


// Reading

router.get('/participant/:position', async (req, res) => {
    const _id = req.params.position
    try {
        const users = await Participant.findById(_id)
        if(!users) {
            return res.status(404).send({
                message: "please enter a valid position"
            })
        }
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/participant/:position/:name', async (req, res) => {
    const _position = req.params.position
    const _name = req.params.name
    try {
        const users = await Participant.findById(_position)
        if(users == null) {
            return res.status(404).send({
                message: "please enter a valid position"
            })
        }
        users.participants_details.forEach(element => {
            if (element._id == _name) {
                return res.send(element)
            }
        })
        return res.status(404).send({
            message: "please enter a valid name"
        })
    } catch(e) {
        res.status(500).send()
    }
})

// Updating

router.patch('/participant/:position/:name', async (req, res) => {
    const details = req.body.participants_details
    console.log(details)
    try {
        const users = await Participant.findById(req.params.position)
        console.log(users)
        if(users == null) {
            return res.status(404).send({
                message: "please enter a valid position"
            })
        }
        
        var flag = false
        users.participants_details.forEach(element => {
            console.log("this")
            console.log(element._id, req.params.name)
            if (element._id == req.params.name) {
                console.log("accepted")
                flag = true
                element.participant_name = details.participant_name
                element.email = details.email
                element.about = details.about
                element.myPromises = details.myPromises
                element.myAchivements = details.myAchivements
                element.mySupportes = details.mySupportes
            }
        })
        if (flag === false) {
            console.log("this now")
            return res.status(404).send({
                message: "please enter a valid name"
            })
        }
        await users.save()
        return res.status(201).send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

// Deleting  

router.delete('/participant/:position/:name', async (req, res) => {
    try {
        const user = await Participant.update({ _id: req.params.position }, { "$pull": { "participants_details":{ "_id": req.params.name } }}, { safe: true, multi: true })
        console.log(user,typeof user)
        if(!user.nModified) {
            return res.status(404).send()
        } 
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router
