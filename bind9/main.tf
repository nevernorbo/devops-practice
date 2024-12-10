terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

resource "docker_image" "bind9" {
  name = "bind9:latest"
  build {
    context    = "."
    dockerfile = "Dockerfile_bind9"
    tag        = ["bind9:latest"]
    no_cache   = true
  }
}

resource "docker_container" "bind9" {
  name  = "bind9"
  image = docker_image.bind9.image_id

  ports {
    internal = 53
    external = 5300
    protocol = "tcp"
  }

  ports {
    internal = 53
    external = 5300
    protocol = "udp"
  }
  
  networks_advanced {
    name = "miiyagi-network"
    ipv4_address = "172.30.0.10"
  }
}