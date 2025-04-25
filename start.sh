#run docker compose
# docker compose up -d

#run npm install
echo "Installing dependencies for backend..."
cd be
npm install

#run npm start
echo "Starting backend..."
npm run start &

#run npm install
echo "Installing dependencies for frontend..."
cd ../fe
npm install

#run npm start
echo "Starting frontend..."
PORT=3001 npm run start &

#wait for all processes to finish
wait
