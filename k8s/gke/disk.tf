resource "google_compute_disk" "skillz-1" {
  name  = "skillz-1"
  type  = "pd-standard"
  zone  = "europe-west1-b"
  size  = "20"
}

# gcloud compute    --project "wescale-site" disks create --size=20GB --zone=europe-west1-b skillz-1
