#!/bin/bash
# Start backend in background
cd backend
nohup ./mvnw spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
sleep 30

# Build & serve frontend
cd ../frontend
npm install
npm run build

# Serve Angular from Spring Boot's static folder
cp -r dist/pokemon-app/* ../backend/src/main/resources/static/
kill $BACKEND_PID
cd ../backend
./mvnw spring-boot:run