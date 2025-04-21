# GXFS ORCE Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Features](#core-features)
3. [System Architecture](#system-architecture)
4. [Installation Guide](#installation-guide)
5. [Workflow Design & Implementation / Backend Integration](#workflow-design-implementation-backend-integration)
6. [User Interface Overview](#user-interface-overview)
7. [Sample Scenarios](#sample-scenarios)
8. [Conclusion and Future Directions](#conclusion-and-future-directions)
9. [Appendix and Additional Resources](#appendix-and-additional-resources)

# GXFS Orchestration Engine Provisioning Tool Documentation

# Overview

The GXFS Orchestration Engine Provisioning Tool, an integral component of the Gaia-X ecosystem, revolutionizes the way environments are provisioned for end users. Its primary function is to automate the deployment process within Kubernetes (k8s), a task that traditionally requires significant manual effort. This tool stands out for its ability to provide speedy, reliable, and scalable environment setups, drastically reducing the incidence of human errors. It represents a significant advancement in the field of automated environment management, especially in the context of the GXFS Orchestration Engine (ORCE), offering a streamlined approach to handle complex deployment scenarios.


# Core Features

- **Simplified Kubernetes Integration**: The tool is designed to work seamlessly with kubeconfig files, eliminating the need for extensive configuration. This feature ensures that users can easily connect to their Kubernetes environments without navigating complex setup processes.

- **Error Checking Mechanisms**: 
  - Domain Name Verification: The tool checks for the existence of domain names, preventing conflicts and ensuring the uniqueness of each deployment.
  - Deployment Existence Validation: Before initiating a new deployment, the tool verifies if a deployment already exists, reducing the risk of duplications and errors in the Kubernetes environment.

- **Intuitive Source Selection from Master Image List**: Users can select deployment sources directly from a master image list. This list is dynamically compiled from the existing Kubernetes deployments, obtained after retrieving the kubeconfig file. This feature provides users with an up-to-date and comprehensive view of available deployment options, enhancing decision-making and simplifying the deployment process.

- **Diverse Deployment Capabilities**
  - Kubernetes Clone Deployment.
  - GitLab-Integrated Repository Deployment
  - Docker Image Accessibility

- **GitLab Repository Integration**: Efficient sourcing and management of Docker images from GitLab repositories, vital for Repository and Docker Deployment types.

- **User-Friendly Interface for Provisioning**:An intuitive interface simplifies the deployment process, making the tool accessible to a broad user base.



# System Architecture

The architecture of the GXFS Orchestration Engine Provisioning Tool is a harmonious blend of front-end user interaction and back-end processing power, facilitated by Node-RED's versatile Orchestration Engine. Below is an outline of the system architecture:

### Front-End Interface

- **UI Builder Node**: The user interface is crafted using the UI Builder node within Node-RED, providing a dynamic and responsive design. This is where users interact with the provisioning wizard, an intuitive interface for inputting their requirements.

- **User Input**: Users perform actions such as:
  - Selecting the deployment type (e.g., Kubernetes Deployment).
  - Uploading the kubeconfig file for interaction with their Kubernetes cluster.
  - Choosing a master image from a dropdown list of all available images fetched from Kubernetes deployments.
  - Entering deployment names and URLs for the creation or validation of new deployments.

### Back-End Processing

- **Data Reception**: Once the user submits their data through the UI, the backend side of the Orchestration Engine (ORCE), Node-RED, receives this input. Node-RED is configured to handle tasks like data validation and executing deployment processes.

- **OS-Level Operations**: Within the flow, Node-RED executes bash scripts and leverages the operating system's capabilities for tasks such as:
  - Executing kubectl commands to interact with the Kubernetes cluster.
  - Cloning deployments, checking domain name availability, and validating deployment existence.

- **Data Processing and Command Execution**: Node-RED processes the received data, invoking bash scripts to execute commands on the Kubernetes cluster. This is where the automation of environment setups takes place.

- **Results Communication**: After completing the provisioning tasks, the results are sent back to the front end, informing users of the status of their provisioning request.

### Provisioning UI

The attached screenshot illustrates the simplicity and clarity of the Provisioning UI, showcasing the fields and options available to the user, emphasizing ease of use and a guided experience through the provisioning process.

![Provisioning System Arch](images/ArchDiagram.jpg)

![Provisioning Sequence Diagram](images/SequenceDiagram.svg)

# Installation Guide for GXFS Orchestration Engine Provisioning Tool

## Step Zero: Initial Configuration of Scaled Docker Image

To streamline your setup, consider utilizing our pre-configured Docker image, which negates the need for a manual, from-scratch installation process by offering a comprehensive suite of pre-installed components.

1. **Launch the Docker Image**
   - Run the following command to start the Docker container:
     ```bash
     docker run -p 1880:1880 -it leanea/gxfs-orce:1.0.0
     ```
   - This command maps port 1880 of the Docker container to port 1880 on your host machine and initiates an interactive terminal session.

2. **Accessing the Docker Container**
   - Upon successful launch, connect to the Docker container using the credentials:
     - Username: `admin`
     - Password: `hackathon`
   - These credentials provide administrative access to the container's environment.

3. **Configure MongoDB Node**
   - Once inside the Docker environment, proceed to configure the MongoDB node.
   - Establish a new connection to your database. This step is crucial for ensuring that the MongoDB node can communicate with your specific database instance effectively.
   - Follow any additional configuration steps necessary for your environment.

## Step One: Install the Gaia-X Orchestration Engine (ORCE)
- Access the Gaia-X Orchestration Engine repository through the following link: [Gaia-X ORCE Repository](https://gitlab.eclipse.org/eclipse/xfsc/oaw).
- Follow the detailed instructions within the repository to install and initialize the ORCE on your system.

## Step Two: Install node-red-contrib-uibuilder
1. Open your command-line interface.
2. Execute the following command to globally install the UI Builder node:
    ```bash
    npm install -g node-red-contrib-uibuilder

3. Proceed to install the required UI libraries into the UI Builder node with:
    ```bash
    npm install bootstrap bootstrap-vue http-vue-loader vue vue-router

## Step Three: Import the Provisioning Framework
1. Open the ORCE and navigate to the settings menu.
![Provisioning Framework Settings](images/installation/Setting.png)

2. Select "Import" to initiate the import dialogue.
![Provisioning Framework Import](images/installation/Import.png)

3. Choose and import the [JSON file](FrameworkCreatorProvisioning.json) that encapsulates the Framework create Provisioning and then Confirm the import to integrate the framework into the ORCE.
![Provisioning Framework Importjson](images/installation/ImportJson.png)

4. A new subflow will manifest in the left-side palette, indicating a successful import.
![Provisioning Framework Subflow](images/installation/NewSubflow.png)

## Step Four: Configure the Provisioning UI
1. Within the ORCE, revisit the settings menu and select "Import".
![Provisioning UI Import](images/installation/Import.png)

2. Import the [JSON file](Provisioning_UI.json) specifically associated with the Provisioning UI and save the configuration.
![Provisioning UI Import](images/installation/ImportProvisionUI.png)

3. Following a successful import, the flow items will be displayed in the main workspace.
![Provisioning UI ImportProvision](images/installation/Flow.png)

4. Assign a unique URL to your UIBuilder node through the ORCE interface.
![Provisioning UI Unique Url](images/installation/UniqueURL.png)

5. Click "Deploy" to activate the workflow.
![Provisioning UI Save](images/installation/Save_Deploy.png)

6. Locate the Framework create Provisioning in the palette and drag it into the workspace.
![Provisioning UI DragCreatorProvisioning](images/installation/DragCreatorProvisioning.png)


7. Connect an inject node to the subflow.
![Provisioning UI ConnectInjectNode](images/installation/ConnectInjectNode.png)

8. Double-click the inject node and set the msg.uib property to correspond with the UIBuilder URL.
![Provisioning UI setMsgui](images/installation/setMsgui.png)

9. Deploy the flow by selecting "Deploy" once again.
![Provisioning UI SecondDeploy](images/installation/SecondDeploy.png)

10. Test the UI by visiting the assigned UIBuilder URL in a browser to verify its operational status.


## Step Five: Import the Provisioning Framework
1. Open the ORCE and navigate to the settings menu.
![Provisioning Framework Settings](images/installation/Setting.png)

2. Select "Import" to initiate the import dialogue.
![Provisioning Framework Import](images/installation/Import.png)

3. Choose and import the [JSON file](FrameworkCreatorProvisioning.json) that encapsulates the Framework create Provisioning and then Confirm the import to integrate the framework into the ORCE.
![Provisioning Framework Importjson](images/installation/ImportJson.png)

4. A new subflow will manifest in the left-side palette, indicating a successful import.
![Provisioning Framework Subflow](images/installation/NewSubflow.png)


With these five steps, you have successfully installed and configured the GXFS Orchestration Engine Provisioning Tool in the ORCE environment, complete with a functional user interface for efficient cross-OS provisioning.

## Workflow Design & Implementation / Backend Integration

### Kubernetes Deployment Workflow
When a user selects the Kubernetes (k8s) deployment option, the system prompts for the upload of a kubeconfig file. Once uploaded, the backend flow extracts a list of existing pods from the Kubernetes cluster and displays them to the user. The user then selects a deployment name and URL. The system performs checks to ensure the URL is unique and the domain does not already exist. If these conditions are met, the 'Provision' button is enabled, allowing the user to initiate the deployment process.
![workflow design](images/k8sDep.png)

### GitLab Repository Deployment Workflow
In the GitLab Repository deployment path, the user uploads a kubeconfig file, triggering the backend to retrieve a list of master images from the GitLab repository. This list is presented to the user for selection. Upon choosing an image, the user specifies a deployment name and URL. The system again checks for URL uniqueness and non-existing domains. If these criteria are satisfied, it activates the 'Provision' button, enabling the deployment process.
![workflow design](images/repoDep.png)




## User Interface Overview

1. **Choose Deployment Type**: Select 'K8s Deployment' from the drop-down menu.
![Provisioning Deployment Type](images/definition-k8s-deployment.png)

2. **Upload Kubeconfig**: Click 'Choose file' to upload your Kubernetes configuration file and then click 'Connect' to establish the connection.
![Provisioning Upload KubeConfig](images/kubeConfig-selected.png)

3. **Select Master Image**: Use the 'Master Image' drop-down to select the image you wish to deploy.
![Provisioning Upload KubeConfig](images/MasterImage.png)

4. **Set Deployment Name**: Enter a unique name for your deployment.

5. **Enter Deployment URL**: Provide the URL where the deployment will be accessible.
![Provisioning Upload KubeConfig](images/deployment-URL-selected.png)

6. **Validate URL**: Press the 'Check' button to verify that the domain is valid. If the URL is valid, the 'Provision' button will appear.
![Provisioning Upload KubeConfig](images/k8s-URL-checked.png)

7. **Provision Deployment**: Once the 'Provision' button appears, click on it to initiate the deployment process.You will see a progress bar indicating the deployment status.
![Provisioning Upload KubeConfig](images/k8s-provisioning.png)


## Sample Scenarios

In this sample scenario, a user employs the GXFS Orchestration Engine Provisioning Tool to deploy a web application into a Kubernetes cluster. After accessing the Provisioning Wizard UI, the user selects 'K8s Deployment', uploads the necessary kubeconfig file, chooses the application's Docker image from a pre-populated list, and enters the deployment details. With a simple click on 'Provision', the tool automates the Kubernetes deployment process, including service and ingress setup. The user can then access the application via the provided URL, demonstrating the tool's effectiveness in simplifying and accelerating Kubernetes deployments.
![Provisioning](images/k8s-provision.png)

## Conclusion and Future Directions

The development and integration of the GXFS Orchestration Engine Provisioning Tool within the Gaia-X ecosystem mark a significant advancement in the provisioning and management of Kubernetes environments. The tool's ability to streamline complex deployment processes, ensuring speed, efficiency, and reliability, is a testament to the innovative direction of the Gaia-X project. By simplifying the deployment workflow, the tool not only reduces the potential for human error but also democratizes access to sophisticated provisioning operations for users of varying technical expertise.

Looking ahead, the future roadmap for the GXFS Orchestration Engine Provisioning Tool includes enhancements that focus on increasing automation, expanding its library of integrations, and improving user experience. Planned updates aim to introduce artificial intelligence and machine learning algorithms to predict and optimize deployment strategies further. Additionally, efforts will be directed towards ensuring compatibility with an even broader range of cloud services and container orchestration platforms.

The commitment to continuous improvement underscores the project's dedication to maintaining alignment with the evolving needs of the Gaia-X community and the broader cloud computing landscape. As the project advances, user feedback and community collaboration will remain pivotal in shaping the tool's enhancements, ensuring that the GXFS Orchestration Engine Provisioning Tool remains at the forefront of provisioning technology within the Gaia-X framework.
