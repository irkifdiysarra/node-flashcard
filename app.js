// const port = 14042
const express = require('express')              //inisialisasi variabel yg berfungsi untuk memanggil express.js
const app = express()                           
const bodyParser = require('body-parser')       //inisialisasi variabel yg berfungsi untuk memanggil body-parser
const cookieParser = require('cookie-parser')   //inisialisasi variabel yg berfungsi untuk memanggil cookie-parser
const mainRoutes = require('./routes/index.js') //inisialisasi variabel yg berfungsi untuk mengatur routing utama di website
const cardRoute = require('./routes/cards.js')  //inisialisasi variabel yg berfungsi untuk mengatur routing cards

app.listen(13250)//host server

//body parser form
app.use(bodyParser.urlencoded({extended:false}))    //menggunakan body-parser yg sudah diinisialisasi sebelumnya 
app.use(cookieParser())                             //menggunakan cookie-parser yg sudah diinisialisasi sebelumnya 
app.use('/public', express.static('public'))        //-> expose static files (untuk mengakses css)

//pasang mesin template pug
app.set('view engine', 'pug')

// app.use((req, res, next)=>{
//     res.locals.username = req.cookies.username
//     let errornya = new Error("Error Cuyy")
//     next(errornya)
// })

// app.use("/makasihloh", (req, res, next) => {
//     console.log("one")
//     next(/makasihloh)                        // penggunaan next untuk menlanjutkan proses ke route berikutnya dengan nama route yg sama (/makasihloh)               
// } , (req, res, next) => {                    // penggunaan use untuk semua route yg diisi pada browser
//     console.log("two")
//     res.send("wagelasihh")
// })

app.use(mainRoutes)                               //menggunakan mainRoutes yg sudah diinisialisasi sebelumnya (mengakses index.js)
app.use('/cards', cardRoute)                      //menggunakan cardRoute yg sudah diinisialisasi sebelumnya (mengakses route.js)

//menampilkan error kalo route salah
app.use((req, res, next) => {
    let errornya = new Error ("Ga Ada Bosq")
    errornya.status = 404
    next(errornya)                // penggunaan next untuk menlanjutkan proses ke route berikutnya jika terjadi error
})


//menampilkan error kalo ada kesalahan di middleware
app.use((err, req, res, next) => {
    res.locals.status = err.status                  //status merupakan id yg ada di halaman error
    res.locals.errorMessage = err.message           //message merupakan id yg ada di halaman error
    res.render('error')                             //menampilkan halaman error yg berisi pesan error jika terjadi kesalahan 
})