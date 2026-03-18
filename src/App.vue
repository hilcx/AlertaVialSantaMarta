<!-- <template>
  <HomeView />
</template>

<script>
import HomeView from "./views/HomeView.vue"

export default {
  name: "App",
  components: {
    HomeView
  }
}
</script> -->


<template>
<div>
  <nav class="menu">
    <div class="left">
      <h2>Sistema Urbano Santa Marta</h2>
    </div>
    <div class="right">
      <router-link to="/">Inicio</router-link>
      <router-link to="/estadisticas">Estadísticas</router-link>
      <span v-if="usuario" class="usuario">
        {{ usuario.nombre }}
      </span>
      <button @click="logout">Salir</button>
    </div>
    
  </nav>
  <router-view />
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
      this.$router.push("/login")
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

.left h2{
  margin:0;
}

.right{
  display:flex;
  align-items:center;
  gap:20px;
}

.right a{
  color:white;
  text-decoration:none;
  font-weight:bold;
  padding:6px 10px;
  border-radius:5px;
}

.right a:hover{
  background:rgba(255,255,255,0.2);
}

.router-link-active{
  border-bottom:2px solid white;
}

.usuario{
  font-size:14px;
  opacity:0.9;
}

/* .menu a{
  color:white;
  text-decoration:none;
  font-weight:bold;
}

.menu a.router-link-active{
  text-decoration:underline;
} */

button{
  background:#35ade5;
  color:white;
  border:none;
  padding:8px 12px;
  border-radius:5px;
  cursor:pointer;
  transition:0.3s;
}

button:hover{
  transform:scale(1.05);
  background:#c62828;
}

/* .card{
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
} */
</style>
































<!-- <script setup>
import { ref } from 'vue'

const calle = ref('')
const descripcion = ref('')
const reportes = ref([])

function enviarReporte() {
  if (calle.value === '' || descripcion.value === '') {
    alert("Completa todos los campos")
    return
  }

  reportes.value.push({
    calle: calle.value,
    descripcion: descripcion.value,
    estado: "Pendiente"
  })

  calle.value = ''
  descripcion.value = ''
}
</script>

<template>
  <div class="app">

    <header>
      <h1>Huecos SMR</h1>
      <p>Reporte ciudadano de huecos en Santa Marta</p>
    </header>

    <section class="stats">
      <h3>Total de reportes: {{ reportes.length }}</h3>
    </section>

    <section class="formulario">

      <h2>Reportar un hueco</h2>

      <input
        v-model="calle"
        placeholder="Nombre de la calle o barrio"
      />

      <textarea
        v-model="descripcion"
        placeholder="Describe el problema del hueco"
      ></textarea>

      <button @click="enviarReporte">
        Enviar reporte
      </button>

    </section>

    <section class="mapa">
      <h2>Mapa de reportes (Próximamente)</h2>
      <div class="placeholder">
        Aquí se integrará un mapa interactivo de Santa Marta
      </div>
    </section>

    <section class="reportes">

      <h2>Reportes registrados</h2>

      <div v-if="reportes.length === 0">
        No hay reportes todavía.
      </div>

      <div class="card" v-for="(reporte,index) in reportes" :key="index">

        <h3>{{ reporte.calle }}</h3>

        <p>{{ reporte.descripcion }}</p>

        <span class="estado">
          Estado: {{ reporte.estado }}
        </span>

      </div>

    </section>

  </div>
</template>

<style>

body{
  margin:0;
  background:#f4f6f8;
}

.app{
  max-width:900px;
  margin:auto;
  font-family:Arial;
}

header{
  background:#1e88e5;
  color:white;
  padding:20px;
  text-align:center;
  border-radius:8px;
  margin-bottom:20px;
}

.stats{
  background:white;
  padding:15px;
  border-radius:8px;
  margin-bottom:20px;
}

.formulario{
  background:white;
  padding:20px;
  border-radius:8px;
  margin-bottom:20px;
}

input, textarea{
  width:100%;
  padding:10px;
  margin-top:10px;
  margin-bottom:10px;
  border-radius:6px;
  border:1px solid #ccc;
}

button{
  background:#43a047;
  color:white;
  padding:10px 15px;
  border:none;
  border-radius:6px;
  cursor:pointer;
}

button:hover{
  background:#2e7d32;
}

.mapa{
  background:white;
  padding:20px;
  border-radius:8px;
  margin-bottom:20px;
}

.placeholder{
  height:150px;
  background:#e0e0e0;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:6px;
  color:#555;
}

.reportes{
  background:white;
  padding:20px;
  border-radius:8px;
}

.card{
  background:#fafafa;
  padding:15px;
  border-radius:6px;
  margin-top:10px;
  border-left:5px solid #e53935;
}

.estado{
  font-size:12px;
  color:#777;
}

</style> -->