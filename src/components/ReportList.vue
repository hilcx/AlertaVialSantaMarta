<template>
<div class="reportes">
    <h2>Reportes registrados</h2>
    <p v-show="reportes.length > 0" class="mensaje">
        Hay reportes registrados en el sistema
    </p>
    <div v-if="reportes.length === 0">
        No hay reportes todavía
    </div>
    <div v-for="(reporte,index) in reportes" :key="index" class="card">
        <h3>{{ reporte.calle }}</h3>
        <p><strong>Barrio:</strong> {{ reporte.barrio }}</p>
        <p>{{ reporte.descripcion }}</p>
        <p>
            <strong>Peligro:</strong>
            <span :class="{
                bajo: reporte.peligro === 'Bajo',
                medio: reporte.peligro === 'Medio',
                alto: reporte.peligro === 'Alto'
            }">
                {{ reporte.peligro }}
            </span>
        </p>
        <P>
            <strong>Estado:</strong>
            <span 
                :class="[
                    'estado-box',
                    reporte.estado === 'Pendiente' ? 'pendiente' : 'solucionado'
                ]">
                {{ reporte.estado }}
            </span>
        </p>

        <p class="fecha">
            <strong>Fecha:</strong> {{ reporte.fecha }}
        </p>

        
        <div class="acciones">
            <button class="estado-button" @click="$emit('cambiar-estado', index)">
                Cambiar estado
            </button>

            <button class="delete" @click="$emit('eliminar-reporte', index)">
                Eliminar
            </button>
        </div>

    </div>

</div>
</template>


<script>
export default{
    name:"ReportList",
    props:{
        reportes:Array
    }
}
</script>


<style scoped>
.reportes{
    background:white;
    padding:20px;
    border-radius:8px;
}

.mensaje{
    font-size:14px;
    color:#555;
    margin-top:5px;
}

.card{
    background:#fafafa;
    padding:15px;
    border-radius:8px;
    margin-top:15px;
    border-left:5px solid #1e88e5;
    box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

.estado{
    font-size:12px;
    color:#777;
}

.delete{
    background:#d32f2f;
    color:white;
    border:none;
    padding:6px 10px;
    border-radius:5px;
    cursor:pointer;
}


.bajo{
    color:green;
    font-weight:bold;
}

.medio{
    color:orange;
    font-weight:bold;
}

.alto{
    color:red;
    font-weight:bold;
}

.estado-box{
    padding:4px 8px;
    border-radius:5px;
    color:white;
    font-size:12px;
    margin-left:5px;
}

.pendiente{
    background:#f57c00;
}

.solucionado{
    background:#43a047;
}

.fecha{
    font-size:12px;
    color:#555;
}

.acciones{
    margin-top:10px;
    display:flex;
    gap:10px;
}

.estado-button{
    background:#1e88e5;
    color:white;
    border:none;
    padding:6px 10px;
    border-radius:5px;
    cursor:pointer;
}
button:hover{
    transform:scale(1.05);
}
</style>





