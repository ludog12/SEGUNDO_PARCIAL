# Establecer la imagen base
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
