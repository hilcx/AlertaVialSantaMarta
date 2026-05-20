<template>
<div class="reportes">
    <h2>Reportes registrados</h2>
    <p v-show="reportes.length > 0" class="mensaje">
        Mostrando {{ reportes.length }} reportes registrados
    </p>
    <div v-if="reportes.length === 0">
        No hay reportes todavía
    </div>
    <div v-for="(reporte,index) in reportes" :key="index" class="card">
        <h3>{{ reporte.calle }}</h3>
        <p><strong>Barrio:</strong> {{ reporte.barrio }}</p>
        <p class="autor">
            Reportado por: {{ reporte.usuarioNombre }}
        </p>
        <p>{{ reporte.descripcion }}</p>
        <img
        v-if="reporte.foto"
        :src="reporte.foto"
        class="foto-reporte"
        />
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
        <p>
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
            <button v-if="esAdmin()" :class="reporte.estado === 'Pendiente' ? 'estado-button pendiente-btn' : 'estado-button solucionado-btn'"
            @click="$emit('cambiar-estado', index)">
                {{ reporte.estado === 'Pendiente' ? 'Marcar como solucionado' : 'Marcar como pendiente' }}
            </button>


            <!-- <button class="estado-button" @click="$emit('cambiar-estado', index)">
                Cambiar estado
            </button> -->

            <button v-if="puedeEditar(reporte)" class="delete" @click="confirmarEliminar(index)">
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
    },
    computed:{
        esAdmin(){
            const usuario = JSON.parse(localStorage.getItem("usuarioActivo"))
            return usuario && usuario.rol === "admin"
        }
    },
    methods:{
        esPropio(reporte){
            const usuario = JSON.parse(localStorage.getItem("usuarioActivo"))
            return usuario && usuario.email === reporte.usuarioEmail

        },
        confirmarEliminar(index){
            const confirmar = confirm("¿Seguro que quieres eliminar este reporte?")
            if(confirmar){
                this.$emit("eliminar-reporte", index)
            }
        }
    }
}
</script>


<style scoped>
.reportes{
    background:white;
    padding:20px;
    border-radius:8px;
}

.foto-reporte{
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 10px;
}

.autor{
    font-size: 12px;
    color:#666;
    margin-bottom: 5px;
    font-style: italic;
    opacity: 0.8;
}

.mensaje{
    font-size:14px;
    color:#555;
    margin-top:5px;
}

.card{
    background:#ffffff;
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    border-left: 5px solid #1e88e5;
    border-bottom: 1px solid #eee;
    box-shadow:0 4px 12px rgba(0,0,0,0.1);
    transition: 0.2s;
}

.card:hover{
  transform:scale(1.02);
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
    transition:0.3s;
}

.delete:hover{
  background:#b71c1c;
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
    background:#fff3e0;
    color:#fb8c00;
    font-weight: bold;
}

.solucionado{
    background:#e8f5e9;
    color:#2e7d32;
    font-weight: bold;
}

.fecha{
    font-size: 12px;
    color:#777;
    margin-top: 5px;
}

.acciones{
    margin-top:10px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.estado-button{
    background:#1e88e5;
    color:white;
    border:none;
    padding:6px 10px;
    border-radius:5px;
    cursor:pointer;
    transition:0.3s;
}

.pendiente-btn{
    background:#f57c00;
}

.pendiente-btn:hover{
    background:#ef6c00;
}

.solucionado-btn{
    background:#43a047;
}

.solucionado-btn:hover{
    background:#2e7d32;
}

.estado-button:hover{
    background:#1565c0;
}

button:hover{
    transform:scale(1.05);
}

@media (max-width: 768px){
    .card{
        padding:12px;
    }

    .acciones{
        flex-direction:column;
    }

}
</style>





