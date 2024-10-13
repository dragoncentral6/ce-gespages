const elementosHtml = document.getElementById("datos");// donde se mostraran los datos
const dato1 = document.getElementById("indicador");
const DataMain = ["52","53","54","55","57","58","60","61","62","63","64","65","67","68","69","70","C1","C2","M2"];
const options = [
        {
            value: "Inactivo",
            text: "Inactivo"
        },
        {
            value: "activo",
            text: "Activo"
        },
        {
            value: "recorrido",
            text: "Recorrido"
        },
        {
            value: "operativo",
            text: "Operativo"
        }
    ];

const optionsSecundario = [
        {
            value: "-",
            text: "-"
        },
        {
            value: "qsy",
            text: "QSY"
        },
        {
            value: "ruta",
            text: "Ruta"
        },
        {
            value: "patios",
            text: "Patios"
        },
        {
            value: "ct",
            text: "CT"
        }
    ];
//variable que contiene la informacion del local storage
let dragon = JSON.parse(localStorage.getItem("lista")) || [];



//funcion para almacenar y crear la base de datos
function GuardarLocalStorage() {
        localStorage.setItem("lista",JSON.stringify(dragon));
}


// funcion cargar informacion cuando esta vacia la base de datos
function CargaDatos() {
	console.log("boton presionado");
    if (dragon == "") {
        //el datamain es la basa de datos por defecto
        DataMain.forEach(function (dragonData) {
	        const DatoDragon =  dragonData;
	        // datos por defecto
	        const CodigoDragon = "D"+dragonData;
	        const EstadoDragon = "Inactivo";
	        const CursorDragon = "-";
	        const ComentDragon = "-";
	        if (DatoDragon) {
	            const newDragon = {CodigoDragon,DatoDragon,EstadoDragon,CursorDragon,ComentDragon};
	            dragon.push(newDragon);
	            console.log(newDragon);
	        }
        });
        GuardarLocalStorage();
        console.log("datos cargados exitosamente");
    }
}


//funcion para actualizar la base de datos
function actualizar(){
    
    //se almacena la base de datos y se compara
    let validar = new Array;
    dragon.forEach(function (dato){
        validar.push(dato.DatoDragon);
    });

    //se ordena la base de datos
    validar.sort((a,b) =>{
        if(a < b){
            return -1;
        };
        if(a > b){
            return 1;
        };
        return 0;
    });

    //se convierten los datos a cadena de texto
    let DatoBase = validar.join();
    let DatoNuevo = DataMain.join();


    // se valida si son diferentes
    if (DatoNuevo != DatoBase) {
        localStorage.removeItem("lista");//se solo el item de la base de datos
        //localStorage.clear(); //se elimina la base de datos completa
        location.reload();// se actualiza la pagina
        console.log("base de datos actualizada");
    } else {
        console.log("los datos estan actualizados");
    }

};

//funcion de impresion de datos
function mostrarDatos(datoValido){
	
    cantidades();
    
    let DataValidar = datoValido;


    if (DataValidar === "i") {
        ventana("Inactivo");
    }
    if (DataValidar === "a") {
        ventana("activo");
    }
    if (DataValidar === "r") {
        ventana("recorrido");
    }
    if (DataValidar === "o") {
        ventana("operativo");
    }


    function ventana(dat){
    


        elementosHtml.innerHTML = "";//donde se pasaran los datos

        dragon.forEach(function (element,index) {


        	

        	// 	se organiza la informacion
        	dragon.sort((a,b) =>{
	            if(a.DatoDragon < b.DatoDragon){
	                return -1;
	            };
	            if(a.DatoDragon > b.DatoDragon){
	                return 1;
	            };
	            return 0;
	        });

	        dragon.sort((a,b) =>{
	            if(a.EstadoDragon < b.EstadoDragon){
	                return -1;
	            };
	            if(a.EstadoDragon > b.EstadoDragon){
	                return 1;
	            };
	            return 0;
	        });

            if (dat === element.EstadoDragon) {

            	const div = document.createElement("div");

	            const nombreShow = document.createElement("label");//creando el label
	            const selectEstadoP = document.createElement("select");// creando los select
            	const selectEstadoS = document.createElement("select");//
	            const comentarioShow = document.createElement("input");//creando input comentarios

	            //se añaden los estilos
                div.classList.add("importDat");
                selectEstadoP.classList.add("selectfirst");
                selectEstadoS.classList.add("selectsec");
                

                //se pasan los datos a cada elemento
                nombreShow.textContent = element.DatoDragon;
                comentarioShow.value = element.ComentDragon;


            	//pasar y crear el select del primer estado
	            if (options && Array.isArray(options)) {
	                const optionDefault = document.createElement("option");

	                let optionTextLS = document.createTextNode(element.EstadoDragon);

	                optionDefault.setAttribute("value", element.EstadoDragon );
	                optionDefault.appendChild(optionTextLS);

	                selectEstadoP.appendChild(optionDefault);

	                let validar = element.EstadoDragon;

	                for (let index = 0; index < options.length; index++) {
	                    const datosSelect = options[index];
	                    const option = document.createElement("option");

	                    if(validar !== datosSelect["value"] || validar !== datosSelect["value"]){
	                        if (datosSelect.value) {
	                            option.setAttribute("value", datosSelect.value);
	                        }
	                        if (datosSelect.text) {
	                            let optionText = document.createTextNode(datosSelect.text);    
	                            option.appendChild(optionText);
	                        }
	                        selectEstadoP.appendChild(option);
	                    };
	                };
	                
	                if (validar == "Inactivo") {
	                    selectEstadoP.classList.add("StateOff");
	                }
	                if (validar == "activo") {
	                    selectEstadoP.classList.add("StateOn");
	                }
	                if (validar == "recorrido") {
	                    selectEstadoP.classList.add("StateRec");
	                }
	                if (validar == "operativo") {
	                    selectEstadoP.classList.add("StateOp");
	                }
	            };
			
				//pasar y crear el select del segundo estado
	            if (optionsSecundario && Array.isArray(optionsSecundario)) {
	                const optionDefaultSec = document.createElement("option");

	                let optionTextLSec = document.createTextNode(element.CursorDragon);

	                optionDefaultSec.setAttribute("value", element.CursorDragon );
	                optionDefaultSec.appendChild(optionTextLSec);

	                selectEstadoS.appendChild(optionDefaultSec);

	                let validar = element.CursorDragon;
	                
	                for (let index = 0; index < optionsSecundario.length; index++) {
	                    
	                    
	                    const datosSelect = optionsSecundario[index];
	                    const option = document.createElement("option");

	                    if(validar !== datosSelect["value"] || validar !== datosSelect["value"]){
	                        if (datosSelect.value) {
	                            option.setAttribute("value", datosSelect.value);
	                        };
	                        if (datosSelect.text) {
	                            let optionText = document.createTextNode(datosSelect.text);    
	                            option.appendChild(optionText);
	                        };
	                        selectEstadoS.appendChild(option);   
	                    };
	                };
	            };

	            // eventos a cambiar el select
	            //evento select primario
	            selectEstadoP.addEventListener('change', function(){
	            	const valorNuevo = selectEstadoP.value;
	                editEstadoP(index,valorNuevo,DataValidar);
	            });

	            //evento select secundario
		        selectEstadoS.addEventListener('change', function(){
		            const NuevoEstado = selectEstadoS.value;
		            editEstadoSecundario(index,NuevoEstado,DataValidar);
		        });

		        //evento comentario
		        comentarioShow.addEventListener('change', function () {
		            const comentario = comentarioShow.value;
		            editComment(index,comentario,DataValidar);
		        });

                //	pasando la informacion de la base de datos a los elemntos del dom
                div.appendChild(nombreShow);
                div.appendChild(selectEstadoP);
                div.appendChild(selectEstadoS);
                div.appendChild(comentarioShow);

                elementosHtml.appendChild(div);

            }
        });
    }
}



function editEstadoP(index,valorNuevo,refEstado) {
    if (valorNuevo == "Inactivo") {

        const valores = dragon[index];//aca se trae la informacion de la base de datos

        const CodigoDragon = valores["CodigoDragon"];
        const DatoDragon = valores["DatoDragon"];
        const EstadoDragon = valorNuevo;//valor modificado
        const CursorDragon = "-";
        const ComentDragon = "";

        const DataUpdate = {CodigoDragon,DatoDragon,EstadoDragon,CursorDragon,ComentDragon};//se carga todo la informacion actualizada

        dragon.splice(index,1);
        dragon.push(DataUpdate);
        GuardarLocalStorage();
    } else {
        const valores = dragon[index];
        const CodigoDragon = valores["CodigoDragon"];
        const DatoDragon = valores["DatoDragon"];
        const EstadoDragon = valorNuevo;//valor modificado
        const CursorDragon = valores["CursorDragon"];
        const ComentDragon = valores["ComentDragon"];

        const DataUpdate = {CodigoDragon,DatoDragon,EstadoDragon,CursorDragon,ComentDragon};

        dragon.splice(index,1);
        dragon.push(DataUpdate);
        GuardarLocalStorage();
    }

    let DataValidar = refEstado;

    if (DataValidar === "i") {
        mostrarDatos("i");
    }
    if (DataValidar === "a") {
        mostrarDatos("a");
    }
    if (DataValidar === "r") {
        mostrarDatos("r");
    }
    if (DataValidar === "o") {
        mostrarDatos("o");
    }
}



function editEstadoSecundario(index,NuevoEstado,refEstado) {
    let fecha = new Date();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    let fulltime = hora+":"+minutos+":"+segundos;

    if (NuevoEstado == "-") {
        
        const valores = dragon[index];
        const CodigoDragon = valores["CodigoDragon"];
        const DatoDragon = valores["DatoDragon"];
        const EstadoDragon = valores["EstadoDragon"];
        const CursorDragon = NuevoEstado;//valor modificado
        const ComentDragon = "";//valor modificado

        const DataUpdate = {CodigoDragon,DatoDragon,EstadoDragon,CursorDragon,ComentDragon};

        dragon.splice(index,1);
        dragon.push(DataUpdate);
        GuardarLocalStorage();

    } else {
        const valores = dragon[index];
        const CodigoDragon = valores["CodigoDragon"];
        const DatoDragon = valores["DatoDragon"];
        const EstadoDragon = valores["EstadoDragon"];
        const CursorDragon = NuevoEstado;//valor modificado
        const ComentDragon = fulltime;//valor modificado

        const DataUpdate = {CodigoDragon,DatoDragon,EstadoDragon,CursorDragon,ComentDragon};

        dragon.splice(index,1);
        dragon.push(DataUpdate);
        GuardarLocalStorage();

    }

    let DataValidar = refEstado;

    if (DataValidar === "i") {
        mostrarDatos("i");
    }
    if (DataValidar === "a") {
        mostrarDatos("a");
    }
    if (DataValidar === "r") {
        mostrarDatos("r");
    }
    if (DataValidar === "o") {
        mostrarDatos("o");
    }
}


function editComment(index,comentario,refEstado){
    const valores = dragon[index];
    const CodigoDragon = valores["CodigoDragon"];
    const DatoDragon = valores["DatoDragon"];
    const EstadoDragon = valores["EstadoDragon"];
    const CursorDragon = valores["CursorDragon"]
    const ComentDragon = comentario;//valor modificado

    const DataUpdate = {CodigoDragon,DatoDragon,EstadoDragon,CursorDragon,ComentDragon};

    dragon.splice(index,1);
    dragon.push(DataUpdate);
    GuardarLocalStorage();

    let DataValidar = refEstado;

    if (DataValidar === "i") {
        mostrarDatos("i");
    }
    if (DataValidar === "a") {
        mostrarDatos("a");
    }
    if (DataValidar === "r") {
        mostrarDatos("r");
    }
    if (DataValidar === "o") {
        mostrarDatos("o");
    }
}

function cantidades(){
    dragon.forEach(function (element,index) {
        
        /*
        let inactivo = element.EstadoDragon.sort();
        cosole.log(inactivo);
        */
        
    })
}


let newWindows
    
function abrir(){
    newWindows = window.open("C:/Users/soporte_gruas/Desktop/CESAR/CEGESFULL/VERSION1/index.html","newWindow","width=305 height=800 left=1200 top=0")
}


