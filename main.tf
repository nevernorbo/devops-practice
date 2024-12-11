terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

resource "docker_network" "app_network" {
  name = "miiyagi-network"
  driver = "bridge"
  ipam_config {
    subnet = "172.30.0.0/16"
    gateway = "172.30.0.1"
  }
  internal = false
}

// 172.30.0.2
module "miiyagi_api" {
  source = "./miiyagi-api"
}

// 172.30.0.3
module "miiyagi_app" {
  source = "./miiyagi-app"
}

// 172.30.0.20
module "nginx" {
  source = "./nginx"
}

// 172.30.0.10
module "bind9" {
  source = "./bind9"
}

// 172.30.0.25
module "prometheus" {
  source = "./monitoring/prometheus"
}

// 172.30.0.26
module "grafana" {
  source = "./monitoring/grafana"
}