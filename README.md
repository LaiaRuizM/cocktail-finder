<p align="center" style="margin-center:10%">
<img src="./LaiaRuiz.png" alt="Laia" width="280"/>
</p>

If you want to see the project: https://laiaruizm.github.io/cocktail-finder/

## EJERCICIO DE EVALUACIÓN MÓDULO 2 | LAIA RUIZ MARTÍNEZ

¡Hola a tod@s 👋🏻!
Antes de nada, me presento: me llamo Laia Ruiz Martínez y formo parte de la promoción Salas de **Adalab**, más concretamente, del **Bootcamp de Programación Web** 💻.

🚀 Por un lado, para los más **curiosos**, os pongo un poquito en contexto sobre el nombre de esta promoción:
Margarita Salas fue una científica bioquímica e investigadora española. Pionera en muchas ramas que hasta entonces solo habían sido llevadas a cabo por hombres. Siempre quiso mantenerse en contacto con la juventud e inspirar a otras mujeres a interesarse en la ciencia. Inició el desarrollo de la biología molecular en España. Entre los logros de su carrera, Salas cuenta con el descubrimiento del ASM polimerasa del virus bacteriófago phi29, que tiene una aplicación crucial en biotecnología: permite amplificar el ADN de manera sencilla, rápida y fiable 🚀.

Por otro lado, aquí podréis ver mi primer ejercicio de JavaScript, el cual consiste en una página web con un buscador de bebidas, en la que puedes ver la foto y el título de la misma. Podrás crear una lista con tus cócteles favoritos y editarla a tu gusto, eliminando los que ya no sean tus favoritos o incluso empezando tu lista de nuevo.
¡El diseño ha sido totalmente libre!

A continuación, expongo las herramientas 🛠️ que hemos manejado, durante estas dos primeras semanas del Bootcamp. Así pues, las herramientas y lenguajes empleados para la realización de este ejercicio, son las siguientes:

- VISUAL STUDIO CODE (VSC) 🗄️
- HTML 📌
- CSS 🕹️
- JS ♡
- GIT / GITHUB 📂
- SASS / SCSS 🔗
- API 🔎
- LOCALSTORAGE 💾
- GULP 🖌️

#### -- Funcionamiento y finalidad de la web --

Esta página es un buscador de cocktails que permite crear una lista de cocktails favoritos.

Cómo proceder:

1. Buscar en la barra de búsqueda, el cocktail que queramos.
1. Nos aparece una lista con los cocktails que contienen las palabras/letras escritas. Detecta mayúsuclas, minúsculas, coincidencias de letras/palabras.
1. Podemos clickar la bebida que queramos para añadirla a la lista de favoritos, que se guardará en el almacenamiento local para futuras búsquedas.
1. Podemos eliminar de favoritos la bebida que queramos, con las siguientes tres opciones:
   1. Sobre la papelera que aparece en la lista de favoritos en cada bebida.
   1. Haciendo click sobre la bebida en la lista principal.
   1. Podemos eliminar todos los elementos de favoritos seleccionando "Borra tus favoritos ♡".
1. Si pulsamos el botón reset todos los datos de las listas, el buscador y el almacenamiento local se borrarán. Además, se refrescará la web.

#### -- Conocimientos aplicados en este ejercicio --

- Modificar el DOM desde JavaScript
- Crear peticiones fetch y promesas
- Gestionar información en formato JSON
- Trabajar con la respuesta del servidor
- Trabajar con listados de datos: arrays [] y objetos {}
- Usar condicionales
- Usar funciones para estructurar el código
- Escuchar al DOM y actuar en consecuencia
- Usar el LocalStorage para guardar información en el nav

#### -- ¿Qué puedo encontrar en este ejercicio? --

> **NOTA:** En este ejercicio, podemos encontrar los siguientes ficheros y carpetas:

1. La carpeta 📂 `src/` son los ficheros de esta página web: HTML, SCSS, JavaScript e imágenes.
1. Las carpetas 📚 `public/` y `docs/`, se generan automáticamente cuando arrancamos el proyecto. GULP lee los fichero que se encuentran en la carpeta src/, los procesa y después, los genera dentro de `public/` y `docs/`.
1. Los ficheros 📝 que están sueltos en la raíz del repositorio, como gulpfile.js, package.json... Son la configuración del proyecto y no necesitamos modificarlos.

#### -- ¿Cómo puedo iniciar el arranque desde cero? --

> **NOTA:** A continuación, expongo los pasos a seguir:

1. **Asegúrate de tener instalado / instala el Node JS**, para poder trabajar con el Starter Kit.
1. **Crea tu propio repositorio.** OJO: Ten muy en cuenta la carpeta dónde estás, en todo momento.
1. Descarga el **Starter kit de Adalab, desde GitHub**.
   - Como recomendación: Evita clonar el repo, por que sino, no podrás añadir commits.
1. **Copia todos los ficheros** del Starter kit en la carpeta raíz de tu repositorio.
   - Recuerda que debes copiar **también los ficheros ocultos** (¡IMPORTANTE!)
   - Si decides clonar el repo, evita copiar la carpeta `.git`. Ya que, si lo haces, estarás sobrescribiendo tu propio repositorio.
1. **Abre una terminal** en la carpeta **raíz** de tu repositorio.
1. **Instala las dependencias** locales ejecutando en la terminal el comando:

   ```bash
   npm install
   ```

#### -- ¿Cómo puedo arrancar el proyecto? --

> **NOTA:** El proyecto hay que arrancarlo cada vez que te pongas a programar.

- Para arrancarlo, ejecuta el comando:

```bash
npm start
```

**¿Qué hace este comando?**

- **Abre una ventana de Chrome y muestra tu página web**. Es lo mismo que hace el plugin de VS Code Live Server (Go live).
- Además, **observa** todos los ficheros que hay dentro de la carpeta `src/`. Cada vez que modifiques un fichero **refresca tu página en Chrome**.
- También **procesa los ficheros** HTML, SASS / CSS y JS y los **genera y guarda en la carpeta `public/`**. Por ejemplo:
  - Convierte los ficheros SASS en CSS.
  - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm start` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar.

#### -- ¿Cómo publicar el proyecto en GitHub Pages? --

Para generar tu página para producción ejecuta el comando:

```bash
npm run docs
```

A continuación:

1. En el explorador, se habrá creado una carpeta llamada `docs/`. Si no aparece de primeras, refresca!
1. En la terminal pon git add -A, git commit -m "run docs" y git push.
1. Entra en la pestaña `settings` de tu repo -> "code and automation" -> en el apartado de GitHub Pages activa la opción **master branch /docs folder** -> save -> refresh. (¡IMPORTANTE!).
1. Puede ser que tarde en crearla, por el deploy. Una vez se haya generado la URL, ya podrás enviarla.
1. Como recomendación: Añade esta URL en la página principal del proyecto, en el apartado ABOUT.

#### -- ¿Quieres aportar algo más? --

¡Si tenéis cualquier duda o quieres contribuir, no dudéis en contactar conmigo! 💡

Muchas gracias por mirar mi pequeña contribución ⏳.

⌨️ Con ❤️ por [Laia](https://github.com/LaiaRuizM)

![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)
