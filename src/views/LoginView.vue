<template>
<div class="login-container">
    <div class="titulo-app">
        <h1>Alerta Vial Santa Marta</h1>
        <p>
            Plataforma ciudadana para el reporte
            de daños en las vías públicas
        </p>
    </div>
    <div class="login-card">
        <h1></h1>
        <h2 v-if="modo === 'login'">Iniciar sesión</h2>
        <h2 v-else>Registrarse</h2>
        <input v-if="modo === 'register'" v-model="nombre" placeholder="Nombre completo">
        <input v-if="modo === 'register'" v-model="cedula" placeholder="Cédula">
        <input v-model="email" placeholder="Correo">
        <input v-model="password" type="password" placeholder="Contraseña">
        <button @click="accion">
            {{ modo === 'login' ? 'Ingresar' : 'Registrarme' }}
        </button>
        <p class="switch">
            <span v-if="modo === 'login'">
                ¿No tienes cuenta?
                <b @click="modo='register'">Regístrate</b>
            </span>
            <span v-else>
                ¿Ya tienes cuenta?
                <b @click="modo='login'">Inicia sesión</b>
            </span>
        </p>
    </div>
</div>

</template>


<script>
export default{
    data(){
        return{
            nombre:"",
            cedula:"",
            email:"",
            password:"",
            modo:"login"
        }
    },
    methods:{
        accion(){
            if(this.modo === "login"){
                this.login()
            }else{
                this.registrar()
            }
        },
        async login(){
            try{
                const respuesta = await fetch("http://localhost:3000/login",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        email:this.email,
                        password:this.password
                    })
                })
                const datos = await respuesta.json()
                if(respuesta.ok){
                    localStorage.setItem("token", datos.token)

                    localStorage.setItem(
                        "usuarioActivo",
                        JSON.stringify(datos.usuario)
                    )
                    this.$emit("login-exitoso")
                    this.$router.push("/")
                }else{
                    alert(datos.mensaje)
                }
            }catch(error){
                console.log(error)
                alert("Error al iniciar sesión")
            }
        },
        async registrar(){
            if(
                this.nombre === "" ||
                this.cedula === "" ||
                this.email === "" ||
                this.password === ""
            ){
                alert("Completa los campos")
                return
            }
            try{
                const respuesta = await fetch("http://localhost:3000/registro",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        nombre:this.nombre,
                        cedula:this.cedula,
                        email:this.email,
                        password:this.password
                    })
                })
                const datos = await respuesta.json()
                alert(datos.mensaje)
                this.nombre = ""
                this.cedula = ""
                this.email = ""
                this.password = ""
                this.modo = "login"
            }catch(error){
                console.log(error)
                alert("Error al registrar")
            }
        }
    }
}

</script>


<style scoped>
.login-container{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:linear-gradient(135deg,#1e88e5,#42a5f5);
}

.titulo-app{
    text-align:center;
    color:white;
    margin-bottom:25px;
}

.titulo-app h1{
    font-size:40px;
    margin-bottom:10px;
}

.titulo-app p{
    font-size:16px;
    opacity:0.9;
}

.login-card{
    background:white;
    padding:30px;
    border-radius:12px;
    width:320px;
    text-align:center;
    box-shadow:0 8px 20px rgba(0,0,0,0.2);
    border-left: 5px solid #1e88e5;
}

h1{
    margin-bottom:10px;
    color:#1e88e5;
}

input{
    width:100%;
    padding:10px;
    margin-top:10px;
    border-radius:6px;
    border:1px solid #ccc;
}

button{
    width:100%;
    padding:10px;
    margin-top:15px;
    background:#1e88e5;
    color:white;
    border:none;
    border-radius:6px;
    cursor:pointer;
    transition:0.3s;
}

button:hover{
    transform:scale(1.05);
}

.switch{
    margin-top:15px;
    font-size:14px;
}

.switch b{
    color:#1e88e5;
    cursor:pointer;
}

@media (max-width: 768px){
    .container{
        padding:10px;
    }
    header{
        font-size:14px;
        padding:15px;
    }
    .cards{
        flex-direction:column;
    }
    
    .acciones{
        flex-direction:column;
    }

    .supderecha{
        gap:8px;
    }

    .supderecha a{
        font-size:12px;
        padding:5px 8px;
    }

    .usuario{
        font-size:12px;
        padding:4px 8px;
    }

    .salir-btn{
        padding:6px 8px;
        font-size:12px;
    }

}
</style>