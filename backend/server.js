const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
const db = require("./db")



function verificarToken(req,res,next){
    const token = req.headers.authorization

    if(!token){

        return res.status(401).json({
            mensaje:"Token requerido"
        })

    }

    try{

        const verificar = jwt.verify(
            token.replace("Bearer ",""),
            process.env.JWT_SECRET
        )

        req.usuario = verificar

        next()

    }catch(error){

        return res.status(403).json({
            mensaje:"Token inválido"
        })

    }

}



app.get("/", (req, res) => {
    res.send("API funcionando")
})



app.post("/registro", (req, res) => {

    const { nombre, cedula, email, password } = req.body

    const sql = `
        INSERT INTO usuarios(nombre, cedula, email, password)
        VALUES(?, ?, ?, ?)
    `

    db.query(
        sql,
        [nombre, cedula, email, password],
        (error, resultado) => {

            if(error){

                console.log(error)

                res.status(500).json({
                    mensaje:"Error al registrar usuario"
                })

            }else{

                res.json({
                    mensaje:"Usuario registrado"
                })

            }

        }
    )

})



app.post("/login", (req, res) => {

    const { email, password } = req.body

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ? AND password = ?
    `

    db.query(sql, [email, password], (error, resultados) => {

        if(error){

            res.status(500).json({
                mensaje:"Error del servidor"
            })

        }else{

            if(resultados.length > 0){

                const usuario = resultados[0]

                const token = jwt.sign(
                    {
                        cedula: usuario.cedula,
                        nombre: usuario.nombre,
                        email: usuario.email,
                        rol: usuario.rol
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:"1h"
                    }
                )

                res.json({
                    mensaje:"Login exitoso",
                    token: token,
                    usuario: usuario
                })

            }else{

                res.status(401).json({
                    mensaje:"Correo o contraseña incorrectos"
                })

            }

        }

    })

})



app.get("/reportes", verificarToken, (req,res)=>{

    const sql = "SELECT * FROM reportes"

    db.query(sql,(error,resultado)=>{

        if(error){

            return res.status(500).json(error)

        }

        res.json(resultado)

    })

})



app.listen(process.env.PORT, () => {

    console.log("Servidor corriendo en puerto 3000")

})