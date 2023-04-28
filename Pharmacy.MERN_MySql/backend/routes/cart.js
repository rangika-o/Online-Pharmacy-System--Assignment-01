const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/',(req,res)=>{
    let sql = "Select * From cart";
    db.query(sql,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id',(req,res)=>{
    let sql = "SELECT * FROM item i, cart c WHERE c.item_id=i.id and user_id=?";

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

router.post('/',(req,res)=>{
    let sql = "insert into cart(cart_quantity,total,item_id,user_id) values ?";
    var newRecord= [[
        req.body.quantity,
        req.body.total,
        req.body.item_id,
        req.body.user_id
    ]]

    db.query(sql, [newRecord] ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Update cart SET cart_quantity=?,total=? where id=?";

    let record= [
        req.body.quantity,
        req.body.quantity*req.body.price,
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

router.delete('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Delete from cart where id=?";

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