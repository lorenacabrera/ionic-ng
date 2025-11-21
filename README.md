Aplicación frontend para la Escuela de Danza que consume el backend Express.
El proyecto está desarrollado con **Ionic + Angular**, usa **autenticación JWT**, y está preparado para integrarse con el backend.

Ionic Framework 7+
Angular 17+
Capacitor
Typescript
HTML/CSS
Node 18+  requerido
npm o yarn para gestión de paquetes


Instalación:

Clonar el repositorio:

bash
git clone https://github.com/lorenacabrera/ionic-ng.git
cd ionic-ng
```

Instalar dependencias:

bash
npm install


---

Arrancar la aplicación en modo desarrollo:

bash
ionic serve


La app estará disponible en:
[http://localhost:8100](http://localhost:8100)

Este puerto debe coincidir con el CORS del backend:

js
app.use(cors({ origin: "http://localhost:8100" }));


---

Autenticación (JWT)

La app está pensada para autenticarse contra el backend:

Backend:

POST http://localhost:3000/login-token


Body:

json
{
  "email": "test@test.com",
  "password": "123"
}


La respuesta devuelve un token:

json
{
  "message": "Token generado correctamente",
  "token": "eyJhbGc..."
}


Este token luego se usa para acceder a rutas protegidas desde Angular mediante un **HTTP Interceptor**

Ejemplo de ruta protegida:


GET http://localhost:3000/ruta-protegida-token


Estructura del proyecto(Frontend):

frontend/ionic-ng
│
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── karma.conf.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── www/                   
├── node_modules/
│
└── src/
    ├── index.html
    ├── main.ts
    ├── global.scss
    ├── polyfills.ts
    ├── zone-flags.ts
    ├── test.ts
    │
    ├── assets/               
    │
    ├── theme/             
    │
    ├── environments/        
    │   ├── environment.ts
    │   └── environment.prod.ts
    │
    └── app/
        ├── app.module.ts
        ├── app-routing.module.ts
        ├── app.component.ts
        ├── app.component.html
        ├── app.component.scss
        ├── app.component.spec.ts
        │
        ├── alumnos/         
        ├── fotos/           
        ├── home/            
        ├── login/           
        ├── niveles/         
        │
        └── services/   


Configuración recomendada para conectar con backend

Crear un archivo:
src/environments/environment.ts


Llamadas HTTP al backend:

En Angular/Ionic se realizará mediante un servicio:

ts
this.http.post(`${environment.backendUrl}/login-token`, {
  email,
  password
});


Pruebas de autenticación realizadas con Bruno

Rutas probadas:

| Método | Ruta                  | Autenticación | Estado |
| ------ | --------------------- | ------------- | ------ |
| POST   | /login-token          | Body JSON     | ✔ 200  |
| GET    | /ruta-protegida-token | Bearer Token  | ✔ 200  |
| POST   | /login-basic          | Basic Auth    | ✔ 200  |


**Lorena Cabrera**
Escuela de Danza – Proyecto Express + Ionic
