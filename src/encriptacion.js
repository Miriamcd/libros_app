
const encriptar = require('bcryptjs')
const bcrypt = require('bcryptjs')

//es la función que tengo que llamar en el login

async function comparar_contrasenya(contrasenya,contrasenya_encriptada){
    const contrasenya_correcta = await encriptar.compare(contrasenya,contrasenya_encriptada)
    return contrasenya_correcta
}

async function encriptar_contrasenya(contrasenya){
    const contrasenya_encripatada = await bcrypt.hash(contrasenya,10)
    return contrasenya_encripatada
}



module.exports={
    encriptar_contrasenya,
    comparar_contrasenya
}