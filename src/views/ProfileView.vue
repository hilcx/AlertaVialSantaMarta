<template>
<div class="container">

  <h1>Perfil de Usuario</h1>
  <div class="perfil-card">

    <div class="foto">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">
    </div>

    <div class="info">
      <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
      <p><strong>Correo:</strong> {{ usuario.email }}</p>
      <p><strong>Cédula:</strong> {{ usuario.cedula }}</p>
      <p><strong>Rol:</strong> Usuario ciudadano</p>
      <p>
        <strong>Usuario desde:</strong>
        {{ usuario.fechaRegistro }}
      </p>
    </div>

  </div>

  <p v-if="total > 0" class="mensaje">
    Gracias por contribuir con la ciudad
  </p>
  <p v-else class="mensaje">
    Aún no has realizado reportes
  </p>

  <div class="estadisticas">
    <div class="card">
      <h3>Total</h3>
      <p>{{ total }}</p>
    </div>

    <div class="card pendiente">
      <h3>Pendientes</h3>
      <p>{{ pendientes }}</p>
    </div>

    <div class="card solucionado">
      <h3>Solucionados</h3>
      <p>{{ solucionados }}</p>
    </div>

  </div>

  <div class="ultimo" v-if="ultimoReporte">
    <h2>Último reporte</h2>
    <p><strong>Calle:</strong> {{ ultimoReporte.calle }}</p>
    <p><strong>Fecha:</strong> {{ ultimoReporte.fecha }}</p>

  </div>

  <div class="mis-reportes">
    <h2>Mis reportes</h2>

    <p v-if="misReportes.length === 0">
      No has realizado reportes aún
    </p>

    <div v-for="(r, index) in misReportes" :key="index" class="reporte">

      <h4>{{ r.calle }}</h4>
      <p>{{ r.descripcion }}</p>

      <p>
        <strong>Estado:</strong>
        <span :class="r.estado === 'Pendiente' ? 'pendiente' : 'solucionado'">
          {{ r.estado }}
        </span>
      </p>

      <p class="fecha">
        {{ r.fecha }}
      </p>

    </div>
  </div>

  <div class="config">
    <h2>Configuración</h2>
    <p>Idioma: Español</p>
    <p>Notificaciones: Activadas</p>
    <button class="tema-btn" @click="cambiarTema">
      {{ temaOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro' }}
  </button>
  </div>

</div>
</template>


<script>
export default {

  data(){
    return{
      usuario:{},
      reportes:[],
      misReportes:[],
      total: 0,
      pendientes: 0,
      solucionados: 0,
      ultimoReporte: null
    }
  },

  created(){
    this.usuario = JSON.parse(localStorage.getItem("usuarioActivo")) || {}
    const datos = localStorage.getItem("reportesHuecos")

    if(datos){
      this.reportes = JSON.parse(datos)
    }

    for(let i = 0; i < this.reportes.length; i++){
      const r = this.reportes[i]

      if(r.usuarioEmail === this.usuario.email){
        this.misReportes.push(r)

        this.total++

        if(r.estado === "Pendiente"){
          this.pendientes++
        }

        if(r.estado === "Solucionado"){
          this.solucionados++
        }
      }
    }
    if(this.misReportes.length > 0){
      this.ultimoReporte = this.misReportes[this.misReportes.length - 1]
    }

  },
  methods: {
    cambiarTema(){
      const actual = localStorage.getItem("temaOscuro")
      if(actual === "true"){
        localStorage.setItem("temaOscuro", false)
        document.body.classList.remove("dark")
      }else{
        localStorage.setItem("temaOscuro", true)
        document.body.classList.add("dark")
      }
    }
  }
}
</script>


<style scoped>

.container{
  max-width:900px;
  margin:auto;
  padding:20px;
  font-family:Arial;
}

.perfil-card{
  display:flex;
  gap:20px;
  background:white;
  padding:20px;
  border-radius:10px;
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

.foto img{
  width:100px;
}

.info p{
  margin:5px 0;
}

.mensaje{
  margin-top: 15px;
  font-weight: bold;
  color:#1e88e5;
}

.estadisticas{
  display:flex;
  gap:10px;
  margin-top:20px;
}

.card{
  flex:1;
  background:white;
  padding:15px;
  border-radius:10px;
  text-align:center;
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

.pendiente{
  color:#fb8c00;
  font-weight:bold;
}

.solucionado{
  color:#2e7d32;
  font-weight:bold;
}

.ultimo{
  margin-top: 20px;
  background:white;
  padding: 15px;
  border-radius:10px;
}

.mis-reportes{
  margin-top:20px;
  background:white;
  padding:15px;
  border-radius:10px;
}

.reporte{
  border-bottom:1px solid #eee;
  padding:10px 0;
}

.fecha{
  font-size:12px;
  color:#777;
}

.config{
  margin-top:20px;
  background:white;
  padding:15px;
  border-radius:10px;
}

.tema-btn{
  background:linear-gradient(90deg,#1e88e5,#1565c0);
  color:white;
  border:none;
  padding:12px 18px;
  border-radius:12px;
  cursor:pointer;
  font-weight:bold;
  margin-top:10px;
  transition:0.3s;

}

.tema-btn:hover{
  transform:scale(1.05);

}
</style>