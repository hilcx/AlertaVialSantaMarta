<!-- <template>
<div class="container">
    <h1>Estadísticas de Reportes</h1>
    <p>Total de reportes registrados: {{ total }}</p>
    <div class="stats">
        <p>Huecos con peligro alto: {{ alto }}</p>
        <p>Huecos con peligro medio: {{ medio }}</p>
        <p>Huecos con peligro bajo: {{ bajo }}</p>
    </div>
</div>
</template>


<script>
export default{
    name:"EstadisticasView",
    data(){
        return{
            reportes:[]
        }
    },
    created(){
        const datos = localStorage.getItem("reportesHuecos")
        if(datos){
            this.reportes = JSON.parse(datos)
        }
    },
    computed:{
        total(){
            return this.reportes.length
        },
        alto(){
            return this.reportes.filter(r => r.peligro === "Alto").length
        },
        medio(){
            return this.reportes.filter(r => r.peligro === "Medio").length
        },
        bajo(){
            return this.reportes.filter(r => r.peligro === "Bajo").length
        }
    }
}
</script>


<style>
.container{
    max-width:900px;
    margin:auto;
    font-family:Arial;
    padding:20px;
}

.stats{
    background:white;
    padding:20px;
    border-radius:8px;
    margin-top:20px;
}
</style> -->



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
            alto:0
        }
    },
    created(){
        const datos = localStorage.getItem("reportesHuecos")
        if(datos){
            this.reportes = JSON.parse(datos)
        }
        this.total = this.reportes.length
        for(let i = 0; i < this.reportes.length; i++){
            const r = this.reportes[i]
            if(r.estado === "Pendiente"){
                this.pendientes++
            }
            if(r.estado === "Solucionado"){
                this.solucionados++
            }
            if(r.peligro === "Alto"){
                this.alto++
            }
        }
    }
}
</script>


<style scoped>
.container{
    max-width:900px;
    margin:auto;
    font-family:Arial;
}

.cards{
    display:flex;
    gap:15px;
    margin:20px 0;
}

.card{
    flex:1;
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

    border-left:6px solid transparent;
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

.card p{
    font-size:22px;
    font-weight:bold;
}

.card:hover{
    transform:scale(1.05);
    transition:0.3s;
}
</style>