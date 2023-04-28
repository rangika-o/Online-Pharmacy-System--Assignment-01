const express = require('express')
var router = express.Router()
var multer = require('multer')
var uniqid = require('uniqid')

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
    let sql = "Select * From item where id=?";

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
    let sql = "Select * From item where title=?";
    let values= [
        req.body.title
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            if(!results[0]){
                let sql = "insert into item(title,description,image,price,quantity) values ?";
                var newRecord= [[
                    req.body.title,
                    req.body.description,
                    req.body.image,
                    req.body.price,
                    req.body.quantity
                ]]

                db.query(sql, [newRecord] ,(err,results)=>{
                    if(!err){
                        res.send(results)
                    }else{
                        console.log(JSON.stringify(err,undefined,2))
                    }
                })
            }else{
                res.send(JSON.stringify({"err":"title"}))
            }
        }else{
            console.log(JSON.stringify(err,undefined,2))
            res.send(JSON.stringify({"err":"connection"}))
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Update item SET title=?,description=?,image=?,price=?,quantity=? where id=?";

    let record= [
        req.body.title,
        req.body.description,
        req.body.image,
        req.body.price,
        req.body.quantity,
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

    let sql = "Delete from item where id=?";

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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})

module.exports = router