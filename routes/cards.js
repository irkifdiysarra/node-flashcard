const express = require('express')                         //inisialisasi variabel yg berfungsi untuk memanggil express.js
const router = express.Router()                            //inisialisasi variabel untuk melakukan routing secara modular(file terpisah)      

const data = require('../data/flashCardData.json').data    //inisialisasi variabel untuk menampung data json yg digunakan, .data berarti memanggil isi dari object data yg ada di json
const cards = data.cards                                   //inisialisasi variabel untuk mengakses object cards yg ada di json
// const { data } = require('../data/flashCardData.json')  -> shorthand properties es6
// const { cards } = data  -> shorthand properties es6

//routers cards -> kalau ada yg buka /cards bakalan dikasih ke suatu id card secara random
router.get('/', (req, res) => {
    let totalCards = cards.length
    let randomId = Math.floor(Math.random() * totalCards)

    res.redirect(`/cards/${randomId}?side=soal`) //mengarahkan ke halaman yg sesuai dengan id hasil randoman
})

// cards
//untuk mengatur routing dengan method get menggunakan params ("/:id"), link yg dipanggil berisi id dari 
router.get("/:id", (req, res) => {
    // res.locals.variabel = "aku siapa? "
    // res.locals.hint = "pernah ketemu?"

    const { id } = req.params           //membaca id dari url
    const { side } = req.query          //membaca url setelah simbol (?), contoh : localhost:xxxx/fungsi/id?side=soal

    const text = cards[id][side]        //mengakses id dan side (soal/jawaban) yg sudah ditampung pada proses sebelumnya
    const { hint } = cards[id]          //mengakses object hint berdasarkan id
    let templateData = {id, text, hint} // shorthand properties es6 untuk menampung object id, text(yg sudah diinisalisasi sebelumnya), dan hint
    // console.dir(data)

    if(side == "jawaban"){              //kondisi untuk menentukan side, jika side jawaban maka akan menampilkan jawaban dari pertanyaan sesuai dengan idnya
        templateData = {id, text} 
        templateData.sidenya = "soal"
        templateData.SideToDisplay = "Lihat Soal" //menampilkan link lihat soal untuk mengakses side soal
    }else if(side == "soal"){          //jika berada di side soal maka akan menampilkan link untuk mengakses soal dan lihat jawaban
        templateData.sidenya = "jawaban"
        templateData.SideToDisplay = "Lihat Jawaban"
    }else if(!side){                    //untuk mengarahkan ke side soal jika url yg diisi user hanya sebatas /cards
        res.redirect(`/cards/${id}?side=soal`)
    }

    // res.locals = {
    //     // soal: cards[req.params.id].soal,
    //     // hint: cards[req.params.id].hint,
    //     // jawaban: cards[req.params.id].jawaban
    //     text: text,
    //     hint: hint
    // }

    res.locals = templateData                              //untuk menampilkan data yg ada di halaman
    res.render("cards" /*, {variabel: "aku siapa?"}*/)     //untuk menampilkan halaman cards
})

module.exports = router                                    //untuk menentukan routing secara modular