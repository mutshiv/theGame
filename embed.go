
// embed.go (located at the root of your project)
package rootfs

import "embed"

//go:embed src/*
var EmbeddedUI embed.FS
