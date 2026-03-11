<template>
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
</style>