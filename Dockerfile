# Usa una imagen base oficial de Node.js 18
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/app

# Copia el package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm ci

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto en el que tu aplicación está corriendo
EXPOSE 4001 80

# Comando para iniciar tu aplicación
CMD ["npm", "start"]
