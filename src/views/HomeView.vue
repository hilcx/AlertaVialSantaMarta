<!-- <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script> -->







<template>
<div class="container">
  <header>
    <h1>Alerta Vial SM</h1>
    <p>Sistema de reporte ciudadano de vías en mal estado</p>
  </header>
  <div class="stats">
    Total de reportes: {{ reportes.length }}
  </div>
  <div class="filtro">
    <label>Filtrar por barrio:</label>
    <select v-model="barrioFiltro">
      <option value="">Todos</option>
      <option>Centro</option>
      <option>Rodadero</option>
      <option>Taganga</option>
      <option>Mamatoco</option>
      <option>Bastidas</option>
      <option>Pescadito</option>
      <option>El Pando</option>
      <option>Manzanares</option>
      <option>La Lucha</option>
      <option>Curinca</option>
      <option>El Parque</option>
    </select>
  </div>



  <div class="mapa">
    <h2>Mapa de referencia</h2>
    <iframe src="https://www.google.com/maps?q=Santa+Marta+Colombia&output=embed" width="100%" height="250" style="border:0">
    </iframe>

  </div>

  <ReportForm @nuevo-reporte="agregarReporte" />
  <ReportList :reportes="reportesFiltrados" @eliminar-reporte="eliminarReporte"/>
</div>

</template>


<script>
import ReportForm from "../components/ReportForm.vue"
import ReportList from "../components/ReportList.vue"

export default {
  name: "HomeView",
  components:{
    ReportForm,
    ReportList
  },
  data(){
    return{
      reportes:[],
      barrioFiltro:""
    }
  },

created(){
  const datos = localStorage.getItem("reportesHuecos")
  if(datos){
    this.reportes = JSON.parse(datos)
  }
},

watch:{
  reportes:{
    handler(nuevosReportes){
      localStorage.setItem(
        "reportesHuecos",
        JSON.stringify(nuevosReportes)
      )
    },
    deep:true
  }
},
computed:{
  reportesFiltrados(){
    if(this.barrioFiltro === ""){
      return this.reportes
    }
    return this.reportes.filter(r => r.barrio === this.barrioFiltro)
  }
},

methods:{
  agregarReporte(reporte){
    this.reportes.push(reporte)
  },
  eliminarReporte(index){
    this.reportes.splice(index,1)
  }
}
}

</script>


<style>
.container{
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
  background:#f4f6f8;
  padding:15px;
  border-radius:8px;
  margin-bottom:20px;
}

.filtro{
  margin-bottom:20px;
}

.mapa{
  margin-bottom:20px;
  background:white;
  padding:15px;
  border-radius:8px;
}

select{
  padding:8px;
  margin-left:10px;
}

</style>





















<!-- <template>

<div class="container">

<header>
<h1>Huecos SMR</h1>
<p>Reporte ciudadano de huecos en Santa Marta</p>
</header>

<div class="stats">
Total de reportes: {{ reportes.length }}
</div>

<ReportForm @nuevo-reporte="agregarReporte" />

<ReportList :reportes="reportes" />

</div>

</template>


<script>

import ReportForm from "../components/ReportForm.vue"
import ReportList from "../components/ReportList.vue"

export default {
  name: "HomeView",
  components:{
    ReportForm,
    ReportList
},

data(){
  return{
    reportes:[]
  }
},

methods:{
  agregarReporte(reporte){
    this.reportes.push(reporte)
  }

}
}

</script>


<style>

.container{
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
background:#f4f6f8;
padding:15px;
border-radius:8px;
margin-bottom:20px;
}

</style> -->
