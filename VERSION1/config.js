
    const form = document.getElementById("FormData");
    const elements = document.getElementById("datos");
    const DataMain = ["52","53","54","55","57","58","59","60","61","62","63","64","65","67","68","69","70","71","72","C1","C2","M2"];
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
    
    let dragon = JSON.parse(localStorage.getItem("lista")) || [];

    form.addEventListener('submit', function (event){
        event.preventDefault();

        let validar = new Array;
        dragon.forEach(function (dato){
        	validar.push(dato.DatoDragon);
        });

        validar.sort((a,b) =>{
            if(a < b){
                return -1;
            };
            if(a > b){
                return 1;
            };
            return 0;
        });

        let ma = validar.join();
        let mp = DataMain.join();

        if (mp != ma) {
        	localStorage.clear();
        	location.reload();
        } else {
        	console.log("los datos estan actualizados");
        }
    });

    function CargaDatos() {
    	if (dragon == "") {
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
	        renderTable();
	        console.log("datos cargados exitosamente");
    	}
    }

    function GuardarLocalStorage() {
        localStorage.setItem("lista",JSON.stringify(dragon));
    }
    
    function renderTable() {
        elements.innerHTML = "";

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

        dragon.forEach(function (element, index) {

            console.log("este es el index "+index);
            const div = document.createElement("div");

            div.classList.add("contenido");

            const selectEstadoP = document.createElement("select");
            const selectEstadoS = document.createElement("select");

            //elementos de cada row
            const nombreShow = document.createElement("p");//letra
            const comentarioShow = document.createElement("input");//comentarios

            //pasar los valores a cada elemento del row
            nombreShow.textContent = element.DatoDragon;
            comentarioShow.value = element.ComentDragon;

            //selectores

            //selector estado primario
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
                }
                
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
            }
            //fin selector estado primario

            //selector estado secundario
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
                        }
                        if (datosSelect.text) {
                            let optionText = document.createTextNode(datosSelect.text);    
                            option.appendChild(optionText);
                        }
                        selectEstadoS.appendChild(option);   
                    };
                }
            }
            //fin selector secundario
            
            // eventos a cambiar el select
            //evento select primario
            selectEstadoP.addEventListener('change', function(){
                const valorNuevo = selectEstadoP.value;
                editEstadoP(index, valorNuevo);
            });

            //evento select secundario
            selectEstadoS.addEventListener('change', function(){
                const NuevoEstado = selectEstadoS.value;
                editEstadoSecundario(index, NuevoEstado);
            });

            //evento comentario
            comentarioShow.addEventListener('change', function () {
                const comentario = comentarioShow.value;
                editComment(index,comentario);
            });

            //mostrar en el html
                        
            div.appendChild(nombreShow);
            div.appendChild(selectEstadoP);
            div.appendChild(selectEstadoS);
            div.appendChild(comentarioShow);

            elements.appendChild(div);
        });    
    }

    function editEstadoP(index,valorNuevo) {
        

        if (valorNuevo == "Inactivo") {
            const valores = dragon[index];
            const CodigoDragon = valores["CodigoDragon"];
            const DatoDragon = valores["DatoDragon"];
            const EstadoDragon = valorNuevo;//valor modificado
            const CursorDragon = "-";
            const ComentDragon = "";

            const DataUpdate = {CodigoDragon,DatoDragon,EstadoDragon,CursorDragon,ComentDragon};

            dragon.splice(index,1);
            dragon.push(DataUpdate);
            GuardarLocalStorage();
            renderTable();
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
            renderTable();
        }

    }

    //  edicion de los campos del segundo estado

    function editEstadoSecundario(index,NuevoEstado) {
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
            renderTable();

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
            renderTable();

        }
    }

    function editComment(index,comentario){
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
        renderTable();
    }
    
    renderTable();

    let newWindows
    
    function abrir(){
        newWindows = window.open("../VERSION2/index.html","newWindow","width=320 height=800 left=1200 top=0")
    }
