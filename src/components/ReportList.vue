<template>
<div class="reportes">
    <h2>Reportes registrados</h2>
    <div v-if="reportes.length === 0">
        No hay reportes todavía
    </div>
    <div
        v-for="(reporte,index) in reportes" :key="index" class="card">
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
        <span class="estado">
            Estado: {{ reporte.estado }}
        </span>
        
        <button class="delete" @click="$emit('eliminar-reporte', index)">
            Eliminar
        </button>
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


<style>
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

.delete{
    margin-top:10px;
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
</style>
















































<!-- <template>

<div class="reportes">

<h2>Reportes registrados</h2>

<div v-if="reportes.length === 0">
No hay reportes todavía
</div>

<div
v-for="(reporte,index) in reportes"
:key="index"
class="card"
>

<h3>{{ reporte.calle }}</h3>

<p><strong>Barrio:</strong> {{ reporte.barrio }}</p>

<p>{{ reporte.descripcion }}</p>

<p>
<strong>Peligro:</strong>
<span class="peligro">
{{ reporte.peligro }}
</span>
</p>

<span class="estado">
Estado: {{ reporte.estado }}
</span>

<button class="delete" @click="$emit('eliminar-reporte', index)">
Eliminar
</button>

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


<style>

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

.delete{
margin-top:10px;
background:#d32f2f;
color:white;
border:none;
padding:6px 10px;
border-radius:5px;
cursor:pointer;
}

</style> -->














