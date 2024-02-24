const buttonEncript = document.querySelector("#btn-ncr");
const buttonDesencript = document.querySelector("#btn-dcr");

const areaTexto = document.querySelector('.rectangle');
const imagenMono = document.querySelector('.rectangle img');
const textoInf = document.querySelector('.rectangle .texto-inf');

const inputTxt = document.getElementById('input-txt');
const message = document.querySelector(".area-texto textarea");
const areaMessage = document.querySelector(".area-texto");
const btnCopy = document.getElementById("btn-cp");

let edoMensaje = 0;  /*0 es que está vacio y 1 que se usó un botón*/

// Definir la media query
const mediaQuery = window.matchMedia('(min-width: 600px) and (max-width: 1250px)');

buttonEncript.addEventListener(("click"), (e)=>{
    let inputMessage = inputTxt.value; 
    const anchoPantalla = window.innerWidth;
    if(inputMessage.trim() != ''){
    edoMensaje = 1;
    ocultarElementos([imagenMono,textoInf]); 
    mostrarElementos([areaMessage,btnCopy]);
    let mensajeProcesado = procesaTexto(inputMessage);
    let messageEncriptado = encripta(mensajeProcesado); 
    if(anchoPantalla>=600 && anchoPantalla<1250){
        areaTexto.style.height = '35em';
        message.innerHTML = capitalize(messageEncriptado); 
    }else if(anchoPantalla<600){
        areaTexto.style.height = "27em";
        message.innerHTML = capitalize(messageEncriptado); 
    }else{
        areaTexto.style.height = "781px";
        message.innerHTML = capitalize(messageEncriptado);
    }
    }else{
    edoMensaje = 0;
    edoMensaje = 0;
    if((anchoPantalla>=600 && anchoPantalla<1250) || anchoPantalla<600){
        mostrarElementos([textoInf]);
        ocultarElementos([areaMessage,btnCopy]);
        if(anchoPantalla>600){
            areaTexto.style.height = '10em';
        }else{
            areaTexto.style.height = '12em';
        }
    }else{
        mostrarElementos([imagenMono,textoInf]);
        ocultarElementos([areaMessage,btnCopy]);
    }
    }
});

buttonDesencript.addEventListener("click", (e)=>{
    let inputMessage = inputTxt.value; 
    const anchoPantalla = window.innerWidth;
    if(inputMessage.trim() != ''){
    edoMensaje = 1;
    ocultarElementos([imagenMono,textoInf]); 
    mostrarElementos([areaMessage,btnCopy]);
    let mensajeProcesado = procesaTexto(inputMessage);
    let messageDesencriptado = desencripta(mensajeProcesado);
    if(anchoPantalla>=600 && anchoPantalla<1250){
    message.innerHTML = capitalize(messageDesencriptado);
    areaTexto.style.height = '35em'; 
    }if(anchoPantalla<600){
        areaTexto.style.height = "27em";
        message.innerHTML = capitalize(messageDesencriptado); 
    }else{
        areaTexto.style.height = "781px";
        message.innerHTML = capitalize(messageDesencriptado); 
    }
    }else{
    edoMensaje = 0;
    if((anchoPantalla>=600 && anchoPantalla<1250) || anchoPantalla<600){
        mostrarElementos([textoInf]);
        ocultarElementos([areaMessage,btnCopy]);
        if(anchoPantalla>600){
            areaTexto.style.height = '10em';
        }else{
            areaTexto.style.height = '12em';
        }
    }else{
        mostrarElementos([imagenMono,textoInf]);
        ocultarElementos([areaMessage,btnCopy]);
    }
    }
});



btnCopy.addEventListener("click",(e)=>{
    let mensajeCopiado = message.innerHTML;
    copiarContenido(mensajeCopiado);
    showCopyMessage();
});




btnCopy.addEventListener("click",(e)=>{
    let mensajeCopiado = message.innerHTML;
    copiarContenido(mensajeCopiado);
    showCopyMessage();
});


function ocultarElementos(elementos){
    elementos.forEach(element => {
        element.style.display = "none";
    });
}

function mostrarElementos(elementos){
    elementos.forEach(element =>{
        element.style.display = "block"; 
    });
}

async function copiarContenido(mensaje) {
    try {
      await navigator.clipboard.writeText(mensaje);
      console.log('Contenido copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  }

  function showCopyMessage() {
    const copyMessage = document.getElementById('copy-message');
    copyMessage.style.display = 'block';
    setTimeout(function() {
        copyMessage.style.display = 'none';
    }, 3000);
}

function encripta(mensaje){
    let mensajeEncriptado = '';
    mensaje.split('').forEach(letter =>{
        switch(letter){
            case 'a':
                mensajeEncriptado += 'ai';
                break;
            case 'e':
                mensajeEncriptado += 'enter'; 
                break;
            case 'i':
                mensajeEncriptado += 'imes';
                break;
            case 'o':
                mensajeEncriptado += 'ober';
                break; 
            case 'u': 
                mensajeEncriptado += 'ufat';
                break;
                
            default:
                mensajeEncriptado += letter;
                break; 
        }
    });
    return mensajeEncriptado;
}

function desencripta(mensaje){
    let mensajeDesencriptado = '';
    let cadena = mensaje.split('');
    let i = 0; 

    while(i<cadena.length){
        switch(cadena[i]){
            case 'a':
                mensajeDesencriptado += cadena[i];
                i += 2;
                break;
            case 'e':
                mensajeDesencriptado += cadena[i];
                i += 5;
                break;
            case 'i': case 'o': case 'u':
                mensajeDesencriptado += cadena[i];
                i += 4;
                break;
                    
            default:
                mensajeDesencriptado += cadena[i];
                i += 1;
                break; 
        }
    }
    console.log(mensajeDesencriptado);
    return mensajeDesencriptado;
}



function procesaTexto(mensaje){
    const mensajeMinusc = mensaje.toLowerCase();
    const sinAcentos = mensajeMinusc.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return sinAcentos;
}

function capitalize(text) {
    const firstLetter = text.charAt(0);
    const rest = text.slice(1);
    return firstLetter.toUpperCase() + rest;
  }


  const handleMediaQuery = (mediaQuery) => {
    const anchoPantalla = window.innerWidth;
    if(mediaQuery.matches && edoMensaje === 0 && anchoPantalla>600){
        mostrarElementos([textoInf]);
        ocultarElementos([areaMessage,btnCopy,imagenMono]);
        areaTexto.style.height = '10em';
    }else if(!mediaQuery.matches && edoMensaje===0 && anchoPantalla>600){
        mostrarElementos([imagenMono,textoInf]);
        ocultarElementos([areaMessage,btnCopy]);
        areaTexto.style.height = "781px";
    }else if(mediaQuery.matches && edoMensaje === 1 && anchoPantalla>600){
        areaTexto.style.height = '35em'; 
    }else if(!mediaQuery.matches && edoMensaje === 1 && anchoPantalla>600){
        areaTexto.style.height = "781px";
    }
    console.log(mediaQuery); 
    console.log(edoMensaje);
  };

  // Llamar a la función inicialmente y agregar un listener para futuros cambios
handleMediaQuery(mediaQuery);
mediaQuery.addListener(handleMediaQuery);







