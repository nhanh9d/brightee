SHOULD_RUN_DOCKER=false

for arg in "$@"; do
  if [ "$arg" = "--docker" ]; then
    SHOULD_RUN_DOCKER=true
  fi
done

if [ "$SHOULD_RUN_DOCKER" = true ]; then
  #run docker compose
  docker compose up -d
else
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
fi

