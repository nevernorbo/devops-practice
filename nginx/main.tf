terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

resource "docker_image" "nginx" {
  name = "nginx:latest"
  build {
    context    = "."
    dockerfile = "Dockerfile_nginx"
    tag        = ["nginx:latest"]
    no_cache   = true
  }
}

resource "docker_container" "nginx" {
  name  = "nginx"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = 80
  }
  
  networks_advanced {
    name = "miiyagi-network"
    ipv4_address = "172.30.0.20"
  }
}