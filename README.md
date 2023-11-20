<div style="text-align:center" align="center"><img src="/client/public/images/landing-image.png" alt="Bracker landing page" /></div>

# Bracker

Bracker is an open source bug tracker that provides a simple but powerful solution.


## Installation

1. Make sure MongoDB is running on your system.

2. Clone the repo

```shell
git clone https://github.com/Arsh1a/Bracker.git
```

3. Install the packages in root, client and server folders

```shell
yarn install
```

4. Create ```.env``` file for both client and server and fill the variables

- client/.env:
```
NEXT_PUBLIC_API_URL = http://localhost:5000/api
```

- server/.env:
```
NODE_ENV = development
SERVER_ENV = development
PORT = 5000
MONGO_URI = 
JWT_SECRET = 
# Optional if you want to use profile picture upload feature
CLOUDINARY_NAME = 
CLOUDINARY_KEY = 
CLOUDINARY_SECRET = 
```

3. Start the app in root directory

```shell
yarn dev
```


## Contributing

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
