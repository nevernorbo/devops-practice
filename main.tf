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

module "miiyagi_api" {
  source = "./miiyagi-api"
}

module "miiyagi_app" {
  source = "./miiyagi-app"
}

module "nginx" {
  source = "./nginx"
}

module "bind9" {
  source = "./bind9"
}