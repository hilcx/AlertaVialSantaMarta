<template>
<div class="container">
    <h1>Estadísticas de Reportes</h1>
    <div class="cards">
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
        
        <div class="card alto">
            <h3>Peligro Alto</h3>
            <p>{{ alto }}</p>
        </div>
    </div>
    
    <div class="extra">
        <h2>Información general</h2>

        <p>
          Barrio con más reportes:
          <strong>{{ barrioMasReportes }}</strong>
        </p>

        <p>
          Nivel más reportado:
          <strong>{{ peligroMasComun }}</strong>
        </p>

        <p>
            Último reporte:
            <strong>{{ ultimoReporte }}</strong>
        </p>

        <p>
            Porcentaje solucionado:
            <strong>{{ porcentajeSolucionado }}%</strong>
        </p>

        <div class="barra">
            <div 
                class="progreso"
                :style="{ width: porcentajeSolucionado + '%' }"
            >
            {{ porcentajeSolucionado }}%
        </div>

        </div>
        <div class="niveles">
            <p>🟥 Alto: {{ alto }}</p>
            <p>🟧 Medio: {{ medio }}</p>
            <p>🟩 Bajo: {{ bajo }}</p>
        </div>
    </div>
</div>
</template>


<script>
export default {
    data(){
        return{
            reportes:[],
            total:0,
            pendientes:0,
            solucionados:0,
            alto: 0,
            medio: 0,
            bajo: 0,
            barrioMasReportes: "",
            peligroMasComun: "",
            ultimoReporte:"",

            porcentajeSolucionado:0
        }
    },
    created(){
        const datos = localStorage.getItem("reportesHuecos")
        if(datos){
            this.reportes = JSON.parse(datos)
        }
        this.total = this.reportes.length

        let barrios = {}
        let peligros = {}
        this.reportes.forEach(r => {
            if(r.estado === "Pendiente"){
                this.pendientes++
            }
            if(r.estado === "Solucionado"){
                this.solucionados++
            }
            if(r.peligro === "Alto"){
                this.alto++
            }
            if(r.peligro === "Medio"){
                this.medio++
            }
            if(r.peligro === "Bajo"){
                this.bajo++
            }

            barrios[r.barrio] =
                (barrios[r.barrio] || 0) + 1

            peligros[r.peligro] =
                (peligros[r.peligro] || 0) + 1
        })
        this.barrioMasReportes = Object.keys(barrios).reduce((a,b) => barrios[a] > barrios[b] ? a : b,"")
        this.peligroMasComun = Object.keys(peligros).reduce((a,b) => peligros[a] > peligros[b] ? a : b, "")
        if(this.reportes.length > 0){
            this.ultimoReporte = this.reportes[this.reportes.length - 1].calle
        }
        this.porcentajeSolucionado = Math.round((this.solucionados / this.total) * 100) || 0
    }
}

</script>


<style scoped>
.container{
  width: 100%;
  max-width: 1200px;
  margin:auto;
  padding:20px;
}

.cards{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
    margin:20px 0;
}

.card{
    /* flex:1;
    height:140px;
    background:white;
    padding:20px;
    border-radius:10px;
    text-align:center;
    box-shadow:0 4px 10px rgba(0,0,0,0.1);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    border-left:6px solid transparent; */
    background:white;
    padding:25px;
    border-radius:15px;
    text-align:center;
    box-shadow:0 4px 15px rgba(0,0,0,0.1);
    transition:0.3s;
    border-left:6px solid #1e88e5;
}

.card.pendiente{
    border-left:5px solid orange;
}

.card.solucionado{
    border-left:5px solid #43a047;
}

.card.alto{
    border-left:5px solid red;
}

/* .card p{
    font-size:22px;
    font-weight:bold;
} */

.card:hover{
    /* transform:scale(1.05);
    transition:0.3s; */
    transform:translateY(-5px);
}

.card p{

    font-size:30px;
    font-weight:bold;

}

.extra{

    background:white;
    padding:25px;
    border-radius:15px;
    margin-top:20px;
    box-shadow:0 4px 15px rgba(0,0,0,0.1);

}

.extra p{

    margin-top:15px;
    font-size:16px;

}

.barra{

    width:100%;
    height:30px;
    background:#ddd;
    border-radius:20px;
    overflow:hidden;
    margin-top:20px;

}

.progreso{

    height:100%;
    background:#43a047;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;

}

.niveles{

    margin-top:20px;
    display:flex;
    gap:20px;
    flex-wrap:wrap;
    font-weight:bold;

}

@media (max-width:768px){

    .container{

        padding:10px;

    }

}
</style>