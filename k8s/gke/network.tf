resource "google_compute_network" "skillz_net" {
  name       = "skillz-net"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "skillz_subnet" {
  name          = "skillz-subnet"
  ip_cidr_range = "10.123.0.0/24"
  network       = "${google_compute_network.skillz_net.self_link}"
  region        = "${var.MOD_REGION}"
}


resource "google_compute_firewall" "skillz_fw_rules" {
  name    = "skillz-fw-rules"
  network = "${google_compute_network.skillz_net.self_link}"

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports = [ "30000-33000" ]
  }
}
