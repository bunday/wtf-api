## World Texting Foundation (WTF) API by Zadat Olayinka
Solution to Node Tasks by G2i
## Setting Up

- Make sure Docker is installed and port 80 is free on your machine
- run `docker-compose up -d` wait for the process to be completed
- Visit `http://localhost/api` to confirm service is running
- Run `http://localhost/api/acronym/upload` to automatically upload the default `acronym.json` file into the mongodb to aid smooth testing
- Documentation is available at [WTF Postman Collection](https://documenter.getpostman.com/view/3710285/UUxuiVXo)


### Note
- Encode special character before passing to the URL for the `PUT` and `DELETE` methods
- You can encode [Here](https://meyerweb.com/eric/tools/dencoder/)



