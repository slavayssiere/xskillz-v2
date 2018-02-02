resource "google_container_cluster" "skillz-cluster" {
  name         = "skillz-cluster"
  zone         = "${var.MOD_REGION}-b"
  initial_node_count = 1


  network = "${google_compute_network.skillz_net.name}"
  subnetwork = "${google_compute_subnetwork.skillz_subnet.name}"

  node_version = "1.8.6-gke.0"
  min_master_version = "1.8.6-gke.0"

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}

# resource "google_dns_record_set" "skillz-front" {
#   name = "skillz.wescale.fr"
#   type = "CNAME"
#   ttl  = 300

#   managed_zone = "skillz-dns"

#   rrdatas = "${google_container_cluster.skillz-cluster.node_pool}"
# }

# resource "google_dns_record_set" "skillz-back" {
#   name = "back.skillz.wescale.fr"
#   type = "CNAME"
#   ttl  = 300

#   managed_zone = "skillz-dns"

#   rrdatas = "${google_container_cluster.skillz-cluster.node_pool}"
# }
