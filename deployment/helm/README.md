# XFSC ORCE Helm Chart

## Overview

This Helm chart deploys the XFSC Orce application to a Kubernetes cluster. The ORCE is an improved Low-code Orchestration engine for event-driven applications with added enhancements and features optimized for XFSC Toolbox.


## Prerequisites

- Kubernetes 1.19+
- Helm 3.1.0+

## Installation

To install the chart with the release name `my-xfsc-orce`:

```bash
helm install my-xfsc-orce ./xfsc-orce
```

This command deploys XFSC ORCE on the Kubernetes cluster in the default configuration. The configuration section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-xfsc-orce` deployment:

```bash
helm delete my-xfsc-orce
```

This command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the XFSC ORCE chart and their default values.

| Parameter                                           | Description                                 | Default                            |
|-----------------------------------------------------|---------------------------------------------|------------------------------------|
| `XORCE.filebrowser.args`                      | Arguments for the filebrowser               | `["--baseurl", "/fscloud"]`        |
| `XORCE.filebrowser.image.repository`          | Docker image repository for filebrowser     | `filebrowser/filebrowser`          |
| `XORCE.filebrowser.image.tag`                 | Docker image tag                            | `latest`                           |
| `XORCE.filebrowser.imagePullPolicy`           | Image pull policy                           | `Always`                           |
| `XORCE.xfscorceLeaneaCom.image.repository`    | Docker image repository for XFSC ORCE       | `leanea/xfsc-orce`                 |
| `XORCE.xfscorceLeaneaCom.image.tag`           | Docker image tag for XFSC ORCE              | `1.0.0`                            |
| `XORCE.xfscorceLeaneaCom.imagePullPolicy`     | Image pull policy for XFSC ORCE             | `IfNotPresent`                     |
| `XORCE.ports.http.port`                       | Port for HTTP traffic                       | `1880`                             |
| `XORCE.ports.http.protocol`                   | Protocol for HTTP port                      | `TCP`                              |
| `XORCE.ports.http.targetPort`                 | Target port for HTTP traffic                | `1880`                             |
| `XORCE.ports.filebrowser.port`                | Port for Filebrowser service                | `80`                               |
| `XORCE.ports.filebrowser.protocol`            | Protocol for Filebrowser port               | `TCP`                              |
| `XORCE.ports.filebrowser.targetPort`          | Target port for Filebrowser traffic         | `80`                               |
| `XORCE.replicas`                              | Number of replicas                          | `1`                                |
| `XORCE.revisionHistoryLimit`                  | Number of old Replicas to keep              | `10`                               |
| `XORCE.type`                                  | Service type                                | `ClusterIP`                        |
| `pvc.XORCE.storageClass`                      | Storage class for volume                    | `do-block-storage`                 |
| `pvc.XORCE.storageRequest`                    | Storage request amount                      | `2Gi`                              |
| `kubernetesClusterDomain`                           | Kubernetes cluster domain used in configs   | `cluster.local`                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
helm install my-xfsc-orce \
  --set XORCE.filebrowser.image.tag=latest \
  ./xfsc-orce
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
helm install my-xfsc-orce -f values.override.yaml ./xfsc-orce
```

## Customizing the Chart Before Installing

You can also clone the chart repository, make changes according to your needs, and locally package and deploy it:

```bash
helm package xfsc-orce
helm install my-xfsc-orce ./xfsc-orce-0.1.0.tgz
```

## Additional Resources

For further customization and advanced usage, refer to the [Helm documentation](https://helm.sh/docs/). The Helm documentation provides comprehensive guides, best practices, and reference materials for managing Kubernetes applications using Helm.