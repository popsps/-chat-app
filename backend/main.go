package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"
)

func main() {
	fmt.Println("Chat App v0.01")
	setupRoutes()
	port := os.Getenv("PORT")
	if port == "" {
		port = ":8085"
	} else{
		port = ":" + port
	}
	fmt.Printf("Listening on port %s\n", port)
	_ = http.ListenAndServe(port, nil)

}

func setupRoutes() {
	//http.HandleFunc("/", func(w http.ResponseWriter, request *http.Request) {
	//	_, _ = fmt.Fprintf(w, "simple server v 0.01")
	//})

	http.Handle("/", http.FileServer(http.Dir("./frontend/build")))

	//fs := http.FileServer(http.Dir("../frontend/build"))
	//http.Handle("/", http.StripPrefix("/", fs))

	http.HandleFunc("/ws", serveWs)
}

// define our websocket endpoint
func serveWs(writer http.ResponseWriter, request *http.Request) {
	fmt.Println(request.Host)

	// upgrade this connection to a websocket
	// connection
	ws, err := upgrader.Upgrade(writer, request, nil)
	if err != nil {
		log.Println(err)
	}
	reader(ws)
}

func reader(conn *websocket.Conn) {
	for {
		// read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// print out the message for clarity
		fmt.Println(string(p))
		sv := []byte(string(p) + " best from server")

		if err := conn.WriteMessage(messageType, sv); err != nil {
			log.Println(err)
			return
		}
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
