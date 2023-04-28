const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/',(req,res)=>{
    let sql = "Select * From item";
    db.query(sql,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id',(req,res)=>{
    let sql = "Select * From item where id=?"

    let record= [
        req.params.id
    ]

    db.query(sql, record ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router