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
  width:100%;
  max-width:1200px;
  margin:auto;
  padding:20px;
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
</style>