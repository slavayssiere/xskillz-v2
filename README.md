# Build and deploy localy

change your /etc/hosts with:

```
127.0.0.1	skillz-back
127.0.0.1	skillz-front
```

and build and deploy with:

```
./build-deploy-local.sh
```

go to http://skillz-front/ 

default user: admin@skillz.fr
default password: admin

# Build

```
cd $GIT_REPO_ROOT/back
docker build -t eu.gcr.io/wescale-site/xebiafrance/skillz-back:version-back .
```

```
cd $GIT_REPO_ROOT/web
docker build -t eu.gcr.io/wescale-site/xebiafrance/skillz-front:version-front .
```

# Deploy locally

```
cd $GIT_REPO_ROOT/
docker-compose down -v && docker-compose up -d
```

# Create infrastructure in GCP

```
cd $GIT_REPO_ROOT/k8s/gke
terraform apply
```

# Deploy on K8S

```
cd $GIT_REPO_ROOT/k8s/kube-config
kubectl create -f .
cd $GIT_REPO_ROOT/k8s/app
kubectl create -f .
```