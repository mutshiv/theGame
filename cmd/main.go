package main

import (
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"

	rootfs "github.com/mutshiv/theGame"
)

var Version = "development"

func main() {
	versionFlag := flag.Bool("version", false, "Print the application version")
	flag.Parse()

	if *versionFlag {
		fmt.Printf("App Version: %s\n", Version)
		os.Exit(0)
	}

	// 1. Properly unpack the subtree of the 'src' directory
	strippedFS, err := fs.Sub(rootfs.EmbeddedUI, "src")
	if err != nil {
		log.Fatalf("Critical error unpacking embedded assets: %v", err)
	}

	// 2. Wrap the stripped file tree directly into an http.FS system
	// NO http.StripPrefix is needed here because fs.Sub already moved index.html to the root layer
	fsServer := http.FileServer(http.FS(strippedFS))
	
	// 3. Bind the server handler straight to the root endpoint
	http.Handle("/", fsServer)

	log.Println("Server started on :8926")
	log.Fatal(http.ListenAndServe(":8926", nil))
}
