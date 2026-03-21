<template>
<div class="login-container">
    <div class="card">
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
        login(){
                const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
                const usuario = usuarios.find(u => 
                u.email === this.email && u.password === this.password
            )
            if(usuario){
                localStorage.setItem("usuarioActivo", JSON.stringify(usuario))
                this.$emit("login-exitoso")
                this.$router.push("/")
            }else{
                alert("Datos incorrectos, esta cuenta no existe")
            }
        },
        registrar(){
            if(this.nombre === "" || this.cedula === "" ||this.email === "" || this.password === ""){
                alert("Completa los campos")
                return
            }
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
            const existe = usuarios.find(u => u.email === this.email)
            if(existe){
                alert("Este correo ya está registrado")
                return
            }
            usuarios.push({
                nombre:this.nombre,
                cedula:this.cedula,
                email:this.email,
                password:this.password
            })
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
            alert("Registro exitoso")
            this.nombre = ""
            this.cedula = ""
            this.email = ""
            this.password = ""
            this.modo = "login"
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

.card{
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

</style>