terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

resource "docker_image" "miiyagi_api" {
  name = "miiyagi-api:latest"
  build {
    context    = "."
    dockerfile = "Dockerfile_api"
    tag        = ["miiyagi-api:latest"]
    no_cache   = true
  }
}

resource "docker_container" "miiyagi_api" {
  name  = "miiyagi-api"
  image = docker_image.miiyagi_api.image_id

  # Port mapping
  ports {
    internal = 8080
    external = 8080
  }
  
  # Hálózat csatlakozás
  networks_advanced {
    name = "miiyagi-network"
    ipv4_address = "172.30.0.2"
  }
}