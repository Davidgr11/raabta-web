// VARIABLES
const form = document.getElementById('adminForm');
const statusMessage = document.getElementById('statusMessage');
const loadDataBtn = document.getElementById('loadDataBtn');
const saveBtn = document.getElementById('saveBtn');

// Guardar los textos originales de los botones
const TEXTOS_ORIGINALES = {
    saveBtn: saveBtn.textContent,
    loadDataBtn: loadDataBtn.textContent
};

// Object para almacenar los datos
let currentData = {};

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar datos automáticamente al iniciar
    await cargarDatos();
});

loadDataBtn.addEventListener('click', cargarDatos);
form.addEventListener('submit', guardarCambios);

// FUNCTIONS
function mostrarEstado(mensaje, tipo) {
    statusMessage.style.display = 'block';
    statusMessage.className = `admin__status admin__status--${tipo}`;
    statusMessage.textContent = mensaje;
    
    // Auto-ocultar después de 5 segundos si es success
    if (tipo === 'success') {
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    }
}

function mostrarFeedbackBoton(boton, mensaje, tipo = 'success') {
    const botonId = boton.id;
    const textoOriginal = TEXTOS_ORIGINALES[botonId];
    const colorOriginal = boton.style.background;
    
    // Cambiar texto y color del botón
    boton.textContent = mensaje;
    if (tipo === 'success') {
        boton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    } else if (tipo === 'error') {
        boton.style.background = 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
    }
    
    // Restaurar después de 2 segundos
    setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.style.background = colorOriginal;
    }, 2000);
}

async function cargarDatos() {
    try {
        mostrarEstado('Cargando datos desde el servidor...', 'loading');
        loadDataBtn.disabled = true;
        loadDataBtn.textContent = 'CARGANDO...';
        
        console.log('Iniciando consulta a la función de Netlify...');
        const response = await fetch('/.netlify/functions/get-access');
        
        console.log('Respuesta recibida:', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        currentData = data.record;
        
        console.log('Datos cargados:', currentData);
        
        // Llenar el formulario con los datos
        llenarFormulario(currentData);
        
        // Mostrar mensaje de éxito en el estado general
        mostrarEstado('✅ Datos recargados correctamente desde el servidor', 'success');
        
        // Mostrar feedback en el botón
        mostrarFeedbackBoton(loadDataBtn, '✅ ¡RECARGADO!', 'success');
        
    } catch (error) {
        console.error('Error completo:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        mostrarEstado(`❌ Error al cargar datos: ${error.message}`, 'error');
        mostrarFeedbackBoton(loadDataBtn, '❌ ERROR', 'error');
    } finally {
        loadDataBtn.disabled = false;
        // No restauramos el texto aquí porque lo hará mostrarFeedbackBoton
    }
}

function llenarFormulario(data) {
    // Contraseñas
    document.getElementById('C1alumno').value = data.C1alumno || '';
    document.getElementById('C1exalumno').value = data.C1exalumno || '';
    document.getElementById('C2alumno').value = data.C2alumno || '';
    document.getElementById('C2exalumno').value = data.C2exalumno || '';
    
    // Módulos C1
    document.getElementById('C1M1').value = data.C1?.M1?.toString() || 'true';
    document.getElementById('C1M2').value = data.C1?.M2?.toString() || 'true';
    document.getElementById('C1M3').value = data.C1?.M3?.toString() || 'true';
    document.getElementById('C1M4').value = data.C1?.M4?.toString() || 'true';
    
    // Módulos C2
    document.getElementById('C2M1').value = data.C2?.M1?.toString() || 'true';
    document.getElementById('C2M2').value = data.C2?.M2?.toString() || 'true';
    document.getElementById('C2M3').value = data.C2?.M3?.toString() || 'true';
    document.getElementById('C2M4').value = data.C2?.M4?.toString() || 'true';
    
    // Avisos
    document.getElementById('aviso1Texto').value = data.avisos?.[0]?.texto || '';
    document.getElementById('aviso1Link').value = data.avisos?.[0]?.link || '';
    document.getElementById('aviso2Texto').value = data.avisos?.[1]?.texto || '';
    document.getElementById('aviso2Link').value = data.avisos?.[1]?.link || '';
}

function recogerDatosFormulario() {
    return {
        C1alumno: document.getElementById('C1alumno').value.trim(),
        C1exalumno: document.getElementById('C1exalumno').value.trim(),
        C2alumno: document.getElementById('C2alumno').value.trim(),
        C2exalumno: document.getElementById('C2exalumno').value.trim(),
        C1: {
            M1: document.getElementById('C1M1').value === 'true',
            M2: document.getElementById('C1M2').value === 'true',
            M3: document.getElementById('C1M3').value === 'true',
            M4: document.getElementById('C1M4').value === 'true'
        },
        C2: {
            M1: document.getElementById('C2M1').value === 'true',
            M2: document.getElementById('C2M2').value === 'true',
            M3: document.getElementById('C2M3').value === 'true',
            M4: document.getElementById('C2M4').value === 'true'
        },
        avisos: [
            {
                texto: document.getElementById('aviso1Texto').value.trim(),
                link: document.getElementById('aviso1Link').value.trim()
            },
            {
                texto: document.getElementById('aviso2Texto').value.trim(),
                link: document.getElementById('aviso2Link').value.trim()
            }
        ]
    };
}

// Función para validar formulario antes de enviar
function validarFormulario() {
    const requiredFields = ['C1alumno', 'C1exalumno', 'C2alumno', 'C2exalumno'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            mostrarEstado(`❌ El campo ${field.previousElementSibling.textContent} es requerido`, 'error');
            field.focus();
            return false;
        }
    }
    
    return true;
}

async function guardarCambios(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }
    
    try {
        mostrarEstado('Guardando cambios en el servidor...', 'loading');
        saveBtn.disabled = true;
        saveBtn.textContent = 'GUARDANDO...';
        
        const datosFormulario = recogerDatosFormulario();
        
        console.log('Datos a enviar:', datosFormulario);
        console.log('JSON a enviar:', JSON.stringify(datosFormulario, null, 2));
        
        const response = await fetch('/.netlify/functions/update-access', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosFormulario)
        });
        
        console.log('Respuesta de actualización:', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            url: response.url
        });

        // Obtener la respuesta como texto primero para ver qué contiene
        const responseText = await response.text();
        console.log('Respuesta como texto:', responseText);

        if (!response.ok) {
            console.error('Error HTTP:', response.status, responseText);
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        // Intentar parsear como JSON
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            throw new Error(`Respuesta no válida del servidor: ${responseText}`);
        }

        console.log('Resultado parseado:', result);
        
        // Actualizar los datos actuales
        currentData = datosFormulario;
        
        // Mostrar mensaje de éxito en el estado general
        mostrarEstado('✅ ¡Cambios guardados exitosamente en el servidor!', 'success');
        
        // Mostrar feedback en el botón
        mostrarFeedbackBoton(saveBtn, '✅ ¡GUARDADO!', 'success');
        
    } catch (error) {
        console.error('Error completo:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        mostrarEstado(`❌ Error al guardar: ${error.message}`, 'error');
        mostrarFeedbackBoton(saveBtn, '❌ ERROR', 'error');
    } finally {
        saveBtn.disabled = false;
        // No restauramos el texto aquí porque lo hará mostrarFeedbackBoton
    }
}