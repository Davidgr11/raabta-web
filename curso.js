// VARIABLES
const footer = document.querySelector('.footer');
const form = document.querySelector('.login__form');
const acceso = document.querySelector('.psw');
const nameUser = document.querySelector('.nameUser');
const cursoSection = document.querySelector('.curso');
const cursoPrincipal = document.querySelector('.curso__principal');

const accesos = {
    C1alumno: '',
    C1exalumno: '',
    C2alumno: '',
    C2exalumno: '',
    C1: {
        M1: '',
        M2: '',
        M3: '',
        M4: ''
    },
    C2: {
        M1: '',
        M2: '',
        M3: '',
        M4: ''
    },
    avisos: [
        {
            texto: '',
            link: ''
        },
        {
            texto: '',
            link: ''
        }
    ]
}


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', async () => {
    footer.style=`display:none;`;
    cursoSection.style=`display:none;`;

    // Al iniciar se piden los datos al servidor
    await consultarDatos();
    
    // Validar si ya hay un acceso guardado DESPUÉS de cargar los datos
    const accesoGuardado = localStorage.getItem('acceso');
    const nameGuardado = localStorage.getItem('name');

    // Validar si el acceso es vigente es decir si existe un acceso igual
    if(accesoGuardado && (accesoGuardado === accesos.C1alumno || accesoGuardado === accesos.C1exalumno || accesoGuardado === accesos.C2alumno || accesoGuardado === accesos.C2exalumno)) {
        document.querySelector('.login').style.display = 'none';
        
        // Verificar que para que curso es y consultarlo
        let nivel = '';
        if(accesoGuardado === accesos.C1alumno || accesoGuardado === accesos.C1exalumno) {
            nivel = 'C1';
        } else if(accesoGuardado === accesos.C2alumno || accesoGuardado === accesos.C2exalumno) {
            nivel = 'C2';
        }

        renderizarCurso(nivel, nameGuardado, accesoGuardado);

    }
});

form.addEventListener('submit', validarLogin);

// FUNCTIONS
async function consultarDatos(e) {
    try {
        //console.log('Iniciando consulta a la función de Netlify...');
        const response = await fetch('/.netlify/functions/get-access');
        
        /*console.log('Respuesta recibida:', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
        });*/

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        accesos.C1alumno = data.record.C1alumno;
        accesos.C1exalumno = data.record.C1exalumno;
        accesos.C2alumno = data.record.C2alumno;
        accesos.C2exalumno = data.record.C2exalumno;
        accesos.C1.M1 = data.record.C1.M1;
        accesos.C1.M2 = data.record.C1.M2;
        accesos.C1.M3 = data.record.C1.M3;
        accesos.C1.M4 = data.record.C1.M4;
        accesos.C2.M1 = data.record.C2.M1;
        accesos.C2.M2 = data.record.C2.M2;
        accesos.C2.M3 = data.record.C2.M3;
        accesos.C2.M4 = data.record.C2.M4;
        accesos.avisos[0].texto = data.record.avisos[0].texto;
        accesos.avisos[0].link = data.record.avisos[0].link;
        accesos.avisos[1].texto = data.record.avisos[1].texto;
        accesos.avisos[1].link = data.record.avisos[1].link;
    }
    catch (error) {
        console.error('Error completo:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        alert(`Error al validar el acceso: ${error.message}`);
        return;
    }
}
async function validarLogin(e) {
    e.preventDefault();
    let psw = '';
    psw = acceso.value.trim();
    let nameValue = nameUser.value.trim();

    if(psw === ''){
        alerta('Por favor, ingresa una contraseña.', 'error');
    } else if(psw === accesos.C1alumno || psw === accesos.C1exalumno || psw === accesos.C2alumno || psw === accesos.C2exalumno) {
        alerta('Acceso concedido', 'success');
        localStorage.setItem('acceso', psw);
        localStorage.setItem('name', nameValue);
        
        // Determinar el nivel correctamente
        let nivel = '';
        if(psw === accesos.C1alumno || psw === accesos.C1exalumno) {
            nivel = 'C1';
        } else if(psw === accesos.C2alumno || psw === accesos.C2exalumno) {
            nivel = 'C2';
        }
        
        console.log('Nivel determinado:', nivel);
        await renderizarCurso(nivel, nameValue, psw);
        document.querySelector('.login').style.display = 'none';

    } else {
        alerta('Contraseña incorrecta. Inténtalo de nuevo.', 'error');
    }
    
}

function alerta(mensaje, tipo) {
    if(document.querySelector('.alerta')) {
        document.querySelector('.alerta').remove();
    }
    const alerta = document.createElement('div');
    if(tipo === 'error') {
        alerta.classList.add('alerta', 'error');
    }
    if(tipo === 'success') {
        alerta.classList.add('alerta', 'success');
    }
    alerta.textContent = mensaje;
    form.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

async function renderizarCurso(nivel, name, accesoGuardado) {
    cursoSection.style=`display:block;`;
    // Fetch al archivo JSON de los niveles
    const response = await fetch(`niveles.json`);
    if (!response.ok) {
        console.error('Error al cargar el archivo JSON:', response.statusText);
        return;
    }
    const data = await response.json();
    const cursoData = data[nivel];


    // Renderizar el curso
    const cursoTitle = document.querySelector('.curso__principal--title');
    const cursoTitleName = document.querySelector('.curso__principal--name');
    const cursoDescription = document.querySelector('.curso__principal--subtitle');

    cursoTitle.textContent = cursoData.title + ' - ';
    cursoTitleName.textContent = ` ${name}`;
    cursoTitleName.classList.add('blueColor');
    cursoTitle.append(cursoTitleName);
    cursoDescription.textContent = cursoData.description;

    cursoData.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.text;
        //linkElement.target = '_blank';
        linkElement.classList.add('curso__links--link');
        document.querySelector('.curso__links').appendChild(linkElement);
    });

    // Ocultar los links de los módulos que estén en false solo si es alumno actual
    if(accesoGuardado === accesos.C1alumno || accesoGuardado === accesos.C2alumno) {
        for(let i=0; i<cursoData.links.length; i++) {
            if(accesos[nivel][`M${i+1}`] === false) {
                document.querySelectorAll('.curso__links--link')[i].style.display = 'none';
            }
        }

        // temporal
        const last = document.querySelector('.curso__img');
        // Estructura
        const heading = document.createElement('h2');
        heading.textContent = 'Avisos';
        const avisoContainer = document.createElement('div');
        avisoContainer.classList.add('curso__principal--avisos');
        let id = 1;
        accesos.avisos.forEach(aviso => {
            const title = document.createElement('h3');
            title.textContent = `---- Aviso ${id} ----`;
            const text = document.createElement('p');
            text.textContent = aviso.texto;
            text.classList.add('curso__principal--aviso');
            const link = document.createElement('a');
            link.href = aviso.link;
            link.textContent = aviso.link;
            link.classList.add('curso__principal--aviso');
            avisoContainer.appendChild(title);
            avisoContainer.appendChild(text);
            avisoContainer.appendChild(link);
            id++;
        });
        cursoPrincipal.insertBefore(heading, last);
        cursoPrincipal.insertBefore(avisoContainer, last);
    }
    document.querySelector('.footer').style.display = 'block';
}
