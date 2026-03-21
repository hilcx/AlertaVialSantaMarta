<template>
<div class="formulario">
    <h2>Reportar daños en la via</h2>
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
    <textarea v-model="descripcion" placeholder="Describe el problema"></textarea>
    <select v-model="peligro">
        <option disabled value="">Nivel de peligro</option>
        <option>Bajo</option>
        <option>Medio</option>
        <option>Alto</option>
    </select>
    <label>Fecha del reporte:</label>
    <input type="date" v-model="fecha">
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
            peligro:"",
            fecha:""
        }
    },
    
    methods:{
        enviarReporte(){
            if(
                this.calle === "" ||
                this.descripcion === "" ||
                this.barrio === "" ||
                this.peligro === "" ||
                this.fecha === ""
            ){
                alert("Completa todos los campos")
                return
            }
            const reporte = {
                calle: this.calle,
                descripcion: this.descripcion,
                barrio: this.barrio,
                peligro: this.peligro,
                estado: "Pendiente",
                fecha: this.fecha
            }
            this.$emit("nuevo-reporte",reporte)
            this.calle= ""
            this.descripcion= ""
            this.barrio= ""
            this.peligro= ""
            this.fecha= ""
        }
    }
}
</script>


<style scoped>
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

textarea{
  resize:none;
  height:80px;
}

button{
    margin-top:15px;
    width:100%;
    padding:10px;
    background:#1e88e5;
    color:white;
    border:none;
    border-radius:5px;
    cursor:pointer;
}

button:hover{
    background:#1565c0;
}

label{
    display:block;
    margin-top:10px;
    font-weight:bold;
}
</style>




