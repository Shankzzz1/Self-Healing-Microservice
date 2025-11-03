# 1️⃣ Base image
FROM node:20-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy dependency files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy source code
COPY . .

# 6️⃣ Build TypeScript
RUN npm run build

# 7️⃣ Expose port
EXPOSE 3002

# 8️⃣ Start the compiled JS
CMD ["npm", "start"]
