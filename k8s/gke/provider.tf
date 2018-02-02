variable "MOD_JSON_PATH" {
  default = "wescale-site-credential.json"
}

variable "MOD_PROJECT" {
  default = "wescale-site"
}

variable "MOD_REGION" {
  default = "europe-west1"
}

provider "google" {
  credentials = "${file("${var.MOD_JSON_PATH}")}"
  project     = "${var.MOD_PROJECT}"
  region      = "${var.MOD_REGION}"
}