#!/bin/bash

# init Backend
cd backend
npm install --force
cd ..

cd build
npm install --force
cd ..

# init Frontend
cd frontend
npm install --force
cd ..
