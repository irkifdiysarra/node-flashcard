const express = require('express')                  //inisialisasi express.js
const router = express.Router()                     //inisialisasi route untuk aplikasi

// route pertama
//fungsi untuk routing halaman awal aplikasi, jika membuka localhost:XXXX dan cookie masih tersimpan (blm logout) maka akan diarahkan ke page index (localhost:XXXX), jika cookie sudah dihapus/logout maka akan diarahkan ke page hello (localhost:XXXX/hello)
router.get("/", (req, res) => {                     
    if(req.cookies.username){ 
         res.locals.username = req.cookies.username
         res.render("index")                            //menampilkan halaman index
    }else{
         res.redirect("hello")                          //mengarahkan ke halaman hello
    }
 })
 
 //logout
 router.post("/", (req, res) => {                 //fungsi untuk logout, jika logout dilakukan maka cookie yg disimpan di browser akan dihapus
     res.clearCookie('username')
     res.redirect("hello")                        //setelah cookie dihapus maka akan diarahkan ke halaman hello
 })
 
 // hello
 router.get("/hello", (req, res) => {             //fungsi untuk routing ke halaman hello, jika cookie tidak ada maka akan diarahkan ke halaman hello
     if(!req.cookies.username){
         res.render("hello")
     }else{
         res.redirect("/")                        //jika cookie ada maka akan diarahkan ke halaman index
     }
     
 })
 
 router.post("/hello", (req, res) => {           //fungsi untuk mengirimkan data username
     res.locals = {
         username: req.body.username
     }
     res.cookie("username", req.body.username)   //membuat cookie untuk data username yg telah dimasukan
     res.redirect("/")
 })

 module.exports = router