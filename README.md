# 🌟 RAABTA - Plataforma de Comunicación Animal

![Raabta Logo](./build/assets/img/logo.avif)

> *Comunicación única entre dos almas. Comunicación con cualquier animal, vivos o fallecidos.*

## 📖 Descripción

**Raabta** es una plataforma web educativa especializada en cursos de comunicación telepática con animales. La plataforma ofrece contenido estructurado en módulos, ejercicios interactivos, y un sistema de gestión de accesos para diferentes tipos de usuarios.

## ✨ Características

### 🎓 **Sistema de Cursos**
- **Curso C1**: Nivel básico de comunicación animal
- **Curso C2**: Nivel avanzado de comunicación animal
- **4 Módulos por curso**: Contenido progresivo y estructurado
- **Ejercicios interactivos**: Textareas que guardan automáticamente en localStorage
- **Contenido multimedia**: Audios de meditación y guías en PDF

### 🔐 **Sistema de Accesos**
- **Alumnos actuales**: Acceso completo a módulos disponibles
- **Ex-alumnos**: Acceso a contenido de revisión
- **Control de módulos**: Habilitación/deshabilitación individual por curso
- **Persistencia de sesión**: Login guardado en localStorage

### 👩‍💼 **Panel de Administración**
- **Gestión de contraseñas**: Modificación de accesos por tipo de usuario
- **Control de módulos**: Activación/desactivación de contenido
- **Sistema de avisos**: Mensajes personalizables para estudiantes
- **Interfaz intuitiva**: Dashboard responsive con feedback visual

### 🛠️ **Características Técnicas**
- **Responsive Design**: Compatible con dispositivos móviles y desktop
- **Arquitectura Serverless**: Funciones de Netlify para backend
- **Base de datos JSON**: Almacenamiento en JSONBin.io
- **SASS**: Estilos organizados con metodología BEM
- **LocalStorage**: Persistencia de datos del usuario

## 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (SASS), JavaScript ES6+
- **Backend**: Netlify Functions (Node.js)
- **Base de datos**: JSONBin.io
- **Hosting**: Netlify
- **Metodología CSS**: BEM (Block Element Modifier)
- **Bundler**: esbuild (Netlify Functions)

## 📁 Estructura del Proyecto

```
raabta-web/
├── 📄 index.html              # Página principal
├── 📄 curso.html              # Login y dashboard de cursos
├── 📄 aimee.html              # Panel de administración
├── 📄 percepcion.html         # Módulo 1 - C1
├── 📄 bases.html              # Módulo 2 - C1
├── 📄 niveles.json            # Configuración de cursos
├── 📄 netlify.toml            # Configuración de Netlify
├── 📄 package.json            # Dependencias del proyecto
├── 📂 src/
│   └── 📂 scss/
│       ├── 📂 base/           # Variables y mixins
│       ├── 📂 components/     # Componentes reutilizables
│       └── 📂 inicio/         # Estilos específicos por página
├── 📂 build/
│   ├── 📂 css/                # CSS compilado
│   └── 📂 assets/             # Imágenes, audios, etc.
├── 📂 netlify/
│   └── 📂 functions/
│       ├── 📄 get-access.js   # Función para obtener datos
│       └── 📄 update-access.js # Función para actualizar datos
└── 📂 js/
    ├── 📄 curso.js            # Lógica del sistema de cursos
    ├── 📄 aimee.js            # Lógica del panel de administración
    └── 📄 animate.js          # Animaciones y efectos
```

## 🔧 Instalación y Desarrollo

### **Prerrequisitos**
- Node.js (v14 o superior)
- NPM o Yarn
- Netlify CLI

### **Configuración Local**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/raabta-web.git
   cd raabta-web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Las variables están en `netlify.toml` para desarrollo local
   - Para producción, configurar en el dashboard de Netlify

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   netlify dev
   ```

5. **Acceder a la aplicación**
   - Frontend: `http://localhost:3000`
   - Funciones: `http://localhost:3000/.netlify/functions/`

## 🌐 Despliegue

### **Netlify (Recomendado)**

1. **Conectar repositorio**
   - Dashboard de Netlify → New site from Git
   - Seleccionar el repositorio

2. **Configurar variables de entorno**
   ```
   JSONBIN__BIN__ID=tu_bin_id
   JSONBIN__API__KEY=tu_api_key
   ```

3. **Deploy automático**
   - Los cambios en `main` se despliegan automáticamente

### **Deploy manual**
```bash
netlify deploy --prod
```

## 📚 Uso del Sistema

### **Para Estudiantes**

1. **Acceso al curso**
   - Ir a `curso.html`
   - Introducir nombre y contraseña
   - Acceder a los módulos disponibles

2. **Navegación**
   - Los módulos se muestran según los permisos
   - Los ejercicios se guardan automáticamente
   - Los audios y documentos están integrados

### **Para Administradores**

1. **Panel de administración**
   - Acceder a `aimee.html`
   - Cargar datos actuales del sistema

2. **Gestión de accesos**
   - Modificar contraseñas por tipo de usuario
   - Activar/desactivar módulos específicos
   - Configurar avisos para estudiantes

3. **Guardar cambios**
   - Los cambios se sincronizan con la base de datos
   - Feedback visual confirmando las operaciones

## 🔐 Sistema de Accesos

### **Tipos de Usuario**
- **C1 Alumno**: Acceso a módulos activos de Curso 1
- **C1 Ex-alumno**: Acceso de revisión a Curso 1
- **C2 Alumno**: Acceso a módulos activos de Curso 2
- **C2 Ex-alumno**: Acceso de revisión a Curso 2

### **Control de Módulos**
Cada módulo puede ser habilitado/deshabilitado independientemente:
- **M1**: Percepción y Sensibilidad
- **M2**: Bases de la Comunicación
- **M3**: Técnicas Avanzadas
- **M4**: Práctica y Perfeccionamiento

## 🎨 Personalización de Estilos

### **Variables SASS**
```scss
// Colores principales
$color-primary: #4a90e2;
$color-secondary: #50c878;
$color-accent: #ff6b6b;

// Espaciado
$space-small: 1rem;
$space-medium: 2rem;
$space-large: 3rem;
```

### **Breakpoints Responsive**
```scss
// Móvil: < 768px
// Tablet: 768px - 1024px
// Desktop: > 1024px
```

## 🚨 Troubleshooting

### **Problemas Comunes**

1. **Error 404 en funciones**
   ```bash
   # Verificar que netlify dev esté corriendo
   netlify dev
   ```

2. **Variables de entorno no encontradas**
   - Verificar `netlify.toml` para desarrollo
   - Verificar dashboard de Netlify para producción

3. **Datos no se guardan**
   - Verificar conexión a JSONBin.io
   - Verificar logs de las funciones Netlify

4. **Estilos no se aplican**
   ```bash
   # Recompilar SASS
   npm run build:css
   ```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Aimee Vértiz** - *Creadora y instructora* - Contenido y metodología
- **Equipo de Desarrollo** - *Implementación técnica*

## 📞 Contacto

- **Web**: [raabta.com](https://raabta.com)
- **Email**: info@raabta.com
- **Instagram**: [@raabta_oficial](https://instagram.com/raabta_oficial)

## 🙏 Agradecimientos

- A todos los estudiantes que han confiado en la metodología Raabta
- A la comunidad de comunicadores telepáticos con animales
- A los desarrolladores de las tecnologías utilizadas

---

> *"La comunicación telepática con animales no es un don especial, es una habilidad natural que todos poseemos y podemos desarrollar."* - Aimee Vértiz

**Hecho con ❤️ para la comunidad Raabta**