<template>
<div>
  <nav class="menu">
    <div class="supizquierda">
      <h2>Sistema Urbano Santa Marta</h2>
    </div>
    <div class="supderecha"> 
      <router-link to="/">Inicio</router-link>
      <router-link to="/estadisticas">Estadísticas</router-link>
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
        usuario:null
      }
    },
    created(){
      this.usuario = JSON.parse(localStorage.getItem("usuarioActivo"))
    },
    methods: {
      logout(){
      localStorage.removeItem("usuarioActivo")
      this.usuario = null
      this.$router.push("/login")
    },
    actualizarUsuario(){
      this.usuario = JSON.parse(localStorage.getItem("usuarioActivo"))
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
  padding:6px 10px;
  border-radius:5px;
  display:flex;
  align-items:center;
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
  padding:5px 10px;
  border-radius:5px;
}

.salir-btn{
  background:transparent;
  color:white;
  border:none;
  font-weight:bold;
  padding:8px 12px;
  cursor:pointer;
  border-radius:5px;
}

.salir-btn:hover{
  background:rgba(148, 8, 8, 0.2);
}
</style>
































