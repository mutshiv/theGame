package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("src"))
	http.Handle("/", fs)

	log.Println("Server started on :8926")
	log.Fatal(http.ListenAndServe(":8926", nil))
}
