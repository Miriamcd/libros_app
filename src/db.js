const mysql =  require('mysql2/promise')
const encriptar = require('./encriptacion')

const conexion =  mysql.createPool({
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST
    })


async function insertar_libro(libro){//en el registro_libros

    await conexion.execute('insert into libros(titulo,autor,genero) values (?,?,?)',[libro.titulo,libro.autor,libro.genero])
}

async function crear_usuario(usuario){//los parametros son todo lo que me llega del registro
    await conexion.execute('insert into usuarios (user,password,email) values (?,?,?)',[usuario.user_name,usuario.user_pass,usuario.user_email])
}


async function validar_login(usuario){//parametros que me llegan del login

    const [rows] = await conexion.execute('select * from usuarios where user=?',[usuario.user_name])
    if (rows.length>0) {
        const usuario_db = rows[0]
        const contrasenya_correcta = await encriptar.comparar_contrasenya(usuario.user_pass,usuario_db.password)
        
        return contrasenya_correcta
        
    } else {
      return false
        
    }
}

async  function obtener_libros(){//todos los libros que me llegan de mi base de datos
    const [rows] = await conexion.execute('select * from libros')
    return rows
}


module.exports ={
    insertar_libro,
    crear_usuario,
    validar_login,
    obtener_libros
    
}