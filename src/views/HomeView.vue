<template>
<div class="container">
  <header>
    <h1>Alerta Vial Santa Marta</h1>
    <p>Sistema de reporte ciudadano de vías en mal estado</p>
    <p class="mensaje">
      Reporta daños en las vías de Santa Marta y ayuda a mejorar tu ciudad
    </p>
  </header>
  <div class="status">
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
  <div v-if="loading" class="loading">
    Cargando reportes...
  </div>
  <ReportList 
    :reportes="filtrarReportes()" 
    @eliminar-reporte="eliminarReporte"
    @cambiar-estado="cambiarEstado"
  />
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
      reportes: [],
      barrioFiltro:"",
      loading: true
    }
  },
  async created(){
    try{
      const token = localStorage.getItem("token")
      const respuesta = await fetch(
        "http://localhost:3000/reportes",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      const datos = await respuesta.json()
      console.log(datos)
      if(Array.isArray(datos)){
        this.reportes = datos
      }else{
        this.reportes = []
        alert(datos.mensaje)
      }
      this.loading = false
    }catch(error){
      console.log(error)
      this.reportes = []
    }
  },
  methods:{
    agregarReporte(reporte){
      this.reportes.push(reporte)
      localStorage.setItem("reportesHuecos", JSON.stringify(this.reportes))
      // this.guardarDatos()
    },
    eliminarReporte(index){
      this.reportes.splice(index,1)
      localStorage.setItem("reportesHuecos", JSON.stringify(this.reportes))
      
      // this.guardarDatos()
    },

    cambiarEstado(index){
      if(this.reportes[index].estado === "Pendiente"){
        this.reportes[index].estado = "Solucionado"
      }else{
        this.reportes[index].estado = "Pendiente"
      }
      // this.guardarDatos()
      localStorage.setItem("reportesHuecos", JSON.stringify(this.reportes))
      alert("Estado actualizado correctamente")
    },

    filtrarReportes(){
      if(this.barrioFiltro === ""){
        return this.reportes
      }
      return this.reportes.filter(r => r.barrio === this.barrioFiltro)
    },

    // guardarDatos(){
    //   localStorage.setItem(
    //     "reportesHuecos",
    //     JSON.stringify(this.reportes)
    //   )
    // }
  }
}
</script>


<style scoped>
.container{
  width:100%;
  max-width:1200px;
  margin:auto;
  padding:20px;
}

header{
  background:#1e88e5;
  color:white;
  padding:20px;
  text-align:center;
  border-radius:8px;
  margin-bottom:20px;
}

.mensaje{
  margin-top:10px;
  font-size:14px;
  color:#e3f2fd;
}

.status{
  background:#e3f2fd;
  padding:15px;
  border-radius:8px;
  margin-bottom:20px;
  font-weight:bold;
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


.loading{
  background:white;
  padding:20px;
  text-align:center;
  border-radius:8px;
  font-weight:bold;
  color:#1e88e5;
  margin-bottom:20px;
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

</style>




