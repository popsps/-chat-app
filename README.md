## Introduction

This is a simple chat app using **React** for frontend and **Golang** for backend.

The app uses web-socket to communicate between the frontend the backend.

To run this app on your local machine, you need `Node`, `Golang`, and `Docker` installed on your machine. 

## Build

In the project directory, you can run:

```shell
sudo docker build -t [name] .
sudo docker run -p 8085:8085 [name]
sudo docker run -it [name] sh
```

Using `Docker` you can run this on any port you want.


