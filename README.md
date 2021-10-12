# Ejercicio de Geocode

En este ejercicio se realiza la busqueda de una dirección con 2 provedores de servicios,
[Here]("https://developer.here.com) y [TomTom]("https://developer.tomtom.com/") donde si una direccion no se encuentra en el primer provedor se busca en el segundo. 

## Ejecucion del Repositorio
Notas Tecnicas del stack utilizado.
* nodejs version `v14.17.3`
* npm version  `7.20.0`
* docker-compose version  `1.29.2`
* Docker version `20.10.7`

*Este repositorio esta pensando como un ejercicio, por lo que no esta optimizado para un entorno de produccion.*

### Configuración del archivo de variables
Copie el `.env.example` a `.env` y llene valores correspondientes, tenga en cuenta que este archivo maneja la configuración base de datos, puerto de la appicación y la credenciales de los proveedores de servicios.

**APP ENVIRONMENT**
* DB_USERNAME= valor asignado en `MYSQL_USER`
* DB_PASSWORD= valor asignado en `MYSQL_PASSWORD`
* DB_DATABASE= valor asignado en `MYSQL_DATABASE`
* DB_HOSTNAME= `db`
* DIALECT= `mysql`

**DATABASE ENVIRONMENT**
* MYSQL_DATABASE= nombre de la base de datos
* MYSQL_USER= nombre del usuario 
* MYSQL_PASSWORD= password del usuario
* MYSQL_ROOT_PASSWORD= password del root

**CONFIG JWT**
* JWT_SECRET= frase secreta a su gusto
* JWT_EXPIRATION_TIME= tiempo de expiracion del token

**CREDENTIALS**
* HERE_API_KEY= su llave de *here*
* HERE_API_KEY_SECRET= su llave secret de *here*
* TOMTOM_API_KEY= su llave de *tomtom*

### Ejecución
```
$ docker-compose up
```

### Uso
Url base `http://localhost:3000/api/v1`

Endpoints: 
* POST `/signup`
* POST `/login`
* GET  `/refresh/token`
* GET `/address?q=su dirección`


### Detener el contenedor
presione `ctrl + c`  1 o 2 veces para detener el contenedor luego 
```
$ docker-compose down 
```
para eliminar los contenedores 