<template>
<div class="formulario">
    <h2>Reportar hueco</h2>
    <input v-model="calle" placeholder="Calle">
    <select v-model="barrio">
        <option disabled value="">Selecciona el barrio</option>
        <option>Centro</option>
        <option>Rodadero</option>
        <option>Taganga</option>
        <option>Mamatoco</option>
        <option>Bastidas</option>
        <option>La Lucha</option>
        <option>Curinca</option>
        <option>El Parque</option>
    </select>
    <textarea v-model="descripcion" placeholder="Describe el hueco"></textarea>
    <select v-model="peligro">
        <option disabled value="">Nivel de peligro</option>
        <option>Bajo</option>
        <option>Medio</option>
        <option>Alto</option>
    </select>
    <button @click="enviarReporte">
        Enviar reporte
    </button>
</div>
</template>


<script>
export default{
    name:"ReportForm",
    data(){
        return{
            calle:"",
            descripcion:"",
            barrio:"",
            peligro:""
        }
    },
    
    methods:{
        enviarReporte(){
            if(
                this.calle === "" ||
                this.descripcion === "" ||
                this.barrio === "" ||
                this.peligro === ""
            ){
                alert("Completa todos los campos")
                return
            }
            const reporte={
                calle:this.calle,
                descripcion:this.descripcion,
                barrio:this.barrio,
                peligro:this.peligro,
                estado:"Pendiente"
            }
            this.$emit("nuevo-reporte",reporte)
            this.calle=""
            this.descripcion=""
            this.barrio=""
            this.peligro=""
        }
    }
}
</script>


<style>
.formulario{
background:white;
padding:20px;
border-radius:8px;
margin-bottom:20px;
}

input, textarea, select{
width:100%;
padding:10px;
margin-top:10px;
border-radius:6px;
border:1px solid #ccc;
}

button{
margin-top:10px;
background:#43a047;
color:white;
padding:10px;
border:none;
border-radius:6px;
cursor:pointer;
}

</style>








































<!-- <template>

<div class="formulario">

<h2>Reportar hueco</h2>

<input v-model="calle" placeholder="Calle o barrio">

<textarea v-model="descripcion" placeholder="Describe el hueco"></textarea>

<button @click="enviarReporte">
Enviar reporte
</button>

</div>

</template>


<script>

export default{

name:"ReportForm",

data(){
return{
calle:"",
descripcion:""
}
},

methods:{

enviarReporte(){

if(this.calle === "" || this.descripcion === ""){
alert("Completa los campos")
return
}

const reporte={
calle:this.calle,
descripcion:this.descripcion,
estado:"Pendiente"
}

this.$emit("nuevo-reporte",reporte)

this.calle=""
this.descripcion=""

}

}

}

</script>


<style>

.formulario{
    background:white;
    padding:20px;
    border-radius:8px;
    margin-bottom:20px;
}

input, textarea{
    width:100%;
    padding:10px;
    margin-top:10px;
    border-radius:6px;
    border:1px solid #ccc;
}

button{
    margin-top:10px;
    background:#43a047;
    color:white;
    padding:10px;
    border:none;
    border-radius:6px;
    cursor:pointer;
}

button:hover{
    background:#2e7d32;
}

</style> -->