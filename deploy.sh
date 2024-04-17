echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r -i ~/FamsNew dist/* root@157.230.242.21:/var/www/famsFE
echo "Done!"
