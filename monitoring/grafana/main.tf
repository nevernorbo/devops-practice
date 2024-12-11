terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

resource "docker_image" "grafana" {
  name = "grafana/grafana:latest"
}

resource "docker_container" "grafana" {
  name  = "grafana"
  image = docker_image.grafana.image_id

  networks_advanced {
    name = "miiyagi-network"
    ipv4_address = "172.30.0.26"
  }

  ports {
    internal = 3000
    external = 3000
  }

  env = [
    "GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource"
  ]

  volumes {
    host_path      = "/workspace/grafana/provisioning"
    container_path = "/etc/grafana/provisioning"
  }
}