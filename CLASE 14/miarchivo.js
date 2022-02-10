//DECLARACION DE UNA CLASE
class Moneda{
    constructor(Denominacion,ValorDolares){
        this.Denominacion=Denominacion
        this.ValorDolares=ValorDolares
    }
}

//OCULTAR EL RESULTADO
$("#resultado").hide()

//DECLARAR LA VARIABLE QUE CONTENGA EL ARCHIVO JSON CON LOS DARO DE LAS MONEDAS
const URLJSON = "monedas.json"

//FUNCION PARA CONVERTIR EL VALOR INGRESADO 
function Convertir(ValorIngresado,ValorRetorno){
    return ValorIngresado*ValorRetorno
}


//AGREGAR OPCIONES A LOS INPUTS CON UNA LLAMADA AJAX A LA VARIABLe PREVIAMENTE DECLARADA
$.getJSON(URLJSON,function(datos,estado){
        if (estado === "success"){
            let datosMonedas = datos
            for(const datos of datosMonedas){
                $("#input1").append(`<option value="${datos.ValorDolares}">${datos.Denominacion}</option>`)
                $("#input2").append(`<option value="${datos.ValorDolares}">${datos.Denominacion}</option>`)
            }
        }
    }
)

//VALIDAR LOS VALORES A CONVERTIR 
function optenerValor() {
   let opcion1 = $("#input1").val()
   let opcion2 = $("#input2").val()
   let valor = $("#valorIn").val()
   let denominacion = document.getElementById("input2")
   let denominacionTexto = denominacion.options[denominacion.selectedIndex].text;
   $("#resultado").hide()

    if(opcion1==opcion2){
        $("#resultado").html( `ERROR POR FAVOR INGRESE DOS MONEDAS DISTINTAS `)
        $("#resultado").fadeIn(900)
    }
    else {
        let valorResultante = Convertir(valor,opcion2/opcion1)

        //MOSTRAMOS NUEVAMENTE EL RESULTADO
        $("#resultado").fadeIn(900)
        $("#resultado").html(`${valorResultante.toFixed(2)} ${denominacionTexto} `)
    }
}


//AGREGAR FUNCION PARA GUARDAR MONEDA AL LOCAL STORAGE  
function guardarFavorito() {
    let monedaFavoritaInput = document.getElementById("input2")
    let monedaFavoritaValor = document.getElementById("input2").value
    let monedaFavoritaSelec = monedaFavoritaInput.options[monedaFavoritaInput.selectedIndex].text;
    let monedaFavorita = new Moneda (monedaFavoritaSelec,monedaFavoritaValor)
    localStorage.setItem("moneda",JSON.stringify(monedaFavorita))
}

//AGREGAR FUNCION PARA CARGAR LA MONEDA DEL LOCAL STORAGE
function cargarFavorito(){
    let monedaFavorita = JSON.parse(localStorage.getItem("moneda"))
    $("#input2").val(monedaFavorita.ValorDolares)  
}


//AGREGAR EVENTOS AL BOTON
$(document).ready(function(){
    $("#enviar").click(optenerValor);
    $("#añadir").click(guardarFavorito);
    $("#cargar").click(cargarFavorito);
})



