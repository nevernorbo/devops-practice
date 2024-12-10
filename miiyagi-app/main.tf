terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

resource "docker_image" "miiyagi_app" {
  name = "miiyagi-app:latest"
  build {
    context    = "."
    dockerfile = "Dockerfile_app"
    tag        = ["miiyagi-app:latest"]
    no_cache   = true
  }
}

resource "docker_container" "miiyagi_app" {
  name  = "miiyagi-app"
  image = docker_image.miiyagi_app.image_id

  ports {
    internal = 5173
    external = 5173
  }
  
  networks_advanced {
    name = "miiyagi-network"
    ipv4_address = "172.30.0.3"
  }
}