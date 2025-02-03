##!/bin/bash
source ~/.envrc


cd build
npm install
cd ..

# backend build
cd backend
pm2 stop videocaptions-backend
pm2 delete videocaptions-backend
npm install
cd ..

pm2 start --name "videocaptions-backend" backend/index.js

# frontend build
cd frontend
npm install
npm run build
pm2 stop videocaptions-frontend
pm2 delete videocaptions-frontend
pm2 start npm --name "videocaptions-frontend" -- start
cd ..
