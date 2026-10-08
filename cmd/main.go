package main

import (
	"flag"
	"log"
	"fmt"
	"os"
	"net/http"
)

var Version = "development"

func main() {
	versionFlag := flag.Bool("version", false, "Print the application version")
	flag.Parse()

	if *versionFlag {
		fmt.Printf("App Version: %s\n", Version)
		os.Exit(0)
	}

	fs := http.FileServer(http.Dir("src"))
	http.Handle("/", fs)

	log.Println("Server started on :8926")
	log.Fatal(http.ListenAndServe(":8926", nil))
}
