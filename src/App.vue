<template>
<div>
  <nav class="menu" v-if="$route.path !== '/login'">
    <div class="supizquierda">
      <h2>Sistema Urbano Santa Marta</h2>
    </div>
    <div class="supderecha"> 
      <router-link to="/">Inicio</router-link>
      <router-link to="/estadisticas">Estadísticas</router-link>
      <router-link v-if="usuario" to="/perfil">Perfil</router-link>
      
      <span v-if="usuario" class="usuario">
        {{ usuario.nombre }}
      </span>
      
      <button v-if="usuario" class="salir-btn" @click="logout">
        Salir
      </button>
    </div>
    
  </nav>
  <router-view @login-exitoso="actualizarUsuario" />
</div>
</template>


<script>
export default {
  name:"App",
    data(){
      return{
        usuario: null,
        temaOscuro: false
      }
    },
    created(){
      this.usuario = JSON.parse(localStorage.getItem("usuarioActivo"))

      const temaGuardado = localStorage.getItem("temaOscuro")
      if(temaGuardado === "true"){
        this.temaOscuro = true
        document.body.classList.add("dark")
      }
    },
    methods: {
      logout(){
      localStorage.removeItem("usuarioActivo")
      this.usuario = null
      this.$router.push("/login")
    },
    actualizarUsuario(){
      this.usuario = JSON.parse(localStorage.getItem("usuarioActivo"))
    },
    cambiarTema(){
      this.temaOscuro = !this.temaOscuro
      localStorage.setItem("temaOscuro", this.temaOscuro)
      if(this.temaOscuro){
        document.body.classList.add("dark")
      }else{
        document.body.classList.remove("dark")
      }
    }
  }
}

</script>


<style>
body{
  margin:0;
  background:#eef2f7;
  font-family: 'Segoe UI', sans-serif;
}

.menu{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:linear-gradient(90deg,#1e88e5,#1565c0);
  padding:15px 30px;
  color:white;
  box-shadow:0 4px 10px rgba(0,0,0,0.2);
}

.supizquierda h2{
  margin:0;
}

.supderecha{
  display:flex;
  align-items:center;
  gap:15px;
}

.supderecha a{
  color:white;
  text-decoration:none;
  font-weight:bold;
  padding:8px 12px;
  border-radius: 6px;
  transition:0.3s;
  /* display:flex;
  align-items:center; */
}

.supderecha a:hover{
  background:rgba(255,255,255,0.2);
}

.router-link-active{
  border-bottom:2px solid white;
}

.usuario{
  font-size:14px;
  text-transform: uppercase;
  font-weight: bold;
  display:flex;
  align-items:center;
  background:rgba(255,255,255,0.2);
  padding:6px 12px;
  border-radius:6px;
}

.salir-btn{
  background:transparent;
  color:white;
  border:none;
  font-weight:bold;
  padding:8px 12px;
  cursor:pointer;
  border-radius:6px;
  transition:0.3s;
}

.salir-btn:hover{
  background: #e53935;
  color:white;
}

.modo-btn{
  background:white;
  color:#1565c0;
  border:none;
  padding:8px 12px;
  border-radius:6px;
  cursor:pointer;
  font-weight:bold;
  transition:0.3s;
}

.modo-btn:hover{
  transform:scale(1.05);
  background:#eeeeee;
}

@media (max-width: 768px){

  .menu{
    flex-direction:column;
    align-items:flex-start;
    gap:10px;
  }

  .supderecha{
    flex-wrap:wrap;
  }

}

body.dark{

    background:#121212;
    color:white;

}

body.dark .container,
body.dark .card,
body.dark .reportes,
body.dark .formulario,
body.dark .mapa,
body.dark .status,
body.dark .extra,
body.dark .login-card{

    background:#1f1f1f !important;
    color:white !important;

}

body.dark h1,
body.dark h2,
body.dark h3,
body.dark p,
body.dark span,
body.dark strong,
body.dark label{

    color:white !important;

}

body.dark input,
body.dark textarea,
body.dark select{

    background:#2c2c2c;
    color:white;
    border:1px solid #555;

}

body.dark .card{

    border-left-color:#42a5f5 !important;

}

</style>