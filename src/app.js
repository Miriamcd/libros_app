require('dotenv').config()
const mysql = require('mysql2/promise')
const path = require('path')

const express = require('express')
const ejs = require('ejs')
const db= require('./db')
const bcrypt= require('bcryptjs')
const encriptar= require('./encriptacion')
const { log } = require('console')


const app = express()

app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.json())
app.use(express.urlencoded({extended: false})) 




app.get('/inicio',(req,res)=>{
    res.render('inicio')

})


app.get('/registro_usuarios',(req,res)=>{
    res.render('registro_usuarios')

})

app.post('/registro_usuarios',async(req,res)=>{
    const db = require('./db')

    const user_name=req.body.user_name
    console.log(user_name)
    const user_pass = req.body.user_pass
    console.log(user_pass)
    const user_email = req.body.user_email
    console.log(user_email)
    
    const contrasenya_encripatada = await encriptar.encriptar_contrasenya(user_pass)
    console.log(contrasenya_encripatada)
    await db.crear_usuario({user_name,user_pass:contrasenya_encripatada,user_email})
    res.render('login')


})

app.get('/login',(req,res)=>{
    res.render('login')

})
app.post('/login',async(req,res)=>{
    const user_name = req.body.user_name
    console.log(user_name)
    const user_pass = req.body.user_pass
    console.log(user_pass)
    const usuario_existe = await db.validar_login({user_name,user_pass})
    console.log(usuario_existe)
    
    if(usuario_existe){
        res.render('welcome',{user_name})

    }

})
app.get('/registro_libros',(req,res)=>{
    res.render('registro_libros')

})
app.get('/libros',(req,res)=>{
    res.render('libros')

})
// app.get('/libros',async(req,res)=>{
//     const db = require('./db')
//     const libros = await obtener_libros()

//     res.render('libros',{libros})
    

// })


app.post('/registro_libros',async(req,res)=>{
    const db = require('./db')

    const titulo= req.body.titulo
    console.log(titulo)
    const autor = req.body.autor
    console.log(autor)
    const genero = req.body.genero
    console.log(genero)
    await db.insertar_libro({titulo,autor,genero})
    res.redirect('/libros')
    


    



})


app.use('/public',express.static(path.join(__dirname, '/public')))
console.log(path.join(__dirname, 'public'))
const PORT = process.env.PORT || 5000

app.listen(PORT)

console.log('Escuchando en el puerto',PORT)




