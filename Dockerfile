# Utilize a imagem oficial do Node.js
FROM node:14

# Instale o TypeScript globalmente
RUN npm install -g typescript
RUN npm install -g ts-node

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e instale as dependências
COPY package.json .
RUN npm install

# Copie o resto do código para o container
COPY . .

# Exponha a porta que o app utiliza
EXPOSE 3000

# Comando para executar o aplicativo
CMD ["npm", "run", "start"]
