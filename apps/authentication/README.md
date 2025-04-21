# GXFS ORCE Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Features](#core-features)
3. [System Architecture](#system-architecture)
4. [Installation Guide](#installation-guide)
5. [Workflow Design & Implementation / Backend Integration](#workflow-design-implementation-backend-integration)
6. [User Interface Overview](#user-interface-overview)
7. [Sample Scenarios](#sample-scenarios)
8. [Conclusion and Future Directions](#conclusion)


# GXFS Scenario Engine Authentication Tool Documentation

# Overview

The GXFS Authentication tool offers a straightforward and secure method for user authentication within the Gaia-X/GXFS ecosystem/Toolbox. It's designed with simplicity in mind, enabling users to quickly register and access GXFS services using just their email and a password. This tool focuses on essential security measures to protect user credentials while maintaining an easy onboarding experience. The guide provided outlines the necessary steps for setting up this authentication tool, ensuring a hassle-free integration for system administrators and developers interested in the Gaia-X Framework Services.


# Core Features
The GXFS Authentication tool is engineered with a suite of features aimed at providing a secure, reliable, and user-friendly experience. Below are the core features that define the tool:

- **User Registration**: New users can easily register by providing essential details such as full name, email address, and password. The registration process is designed to be intuitive, guiding the user through each step with clear instructions and feedback.

- **Service Selection**: Post-login, users have the flexibility to select from a range of available Gaia-X services. The tool's design accommodates a dropdown menu for service selection, which can be updated as new services are added to the ecosystem.

- **Password Encryption**: To ensure the security of user credentials, the GXFS Authentication tool employs encryption techniques. Passwords are hashed and stored securely, ensuring they cannot be read in plain text.

- **Responsive Design**: Responsive Design
The tool is built with a responsive design, ensuring compatibility with various devices and screen sizes, enhancing accessibility and user engagement.




# System Architecture


The GXFS Authentication tool integrates a front-end built with a UI builder and a Node-RED backend Orchestration Engine, interfacing with a MongoDB database. This section describes the technical architecture and flow for both registration and login processes.

### Registration Flow

- **Front-end**: The registration interface is developed using a UI builder node, which is designed to collect essential user information such as full name, email address, and password via a web form.

- **Data Transmission**: The GXFS Authentication tool utilizes WebSocket technology for data transmission. When a user completes the registration form, their input data is transmitted to the backend through a WebSocket connection. This approach differs from traditional HTTP POST requests by providing a continuous two-way interactive communication session between the user's browser and the server. This enables real-time data exchange, enhancing the responsiveness and efficiency of the authentication process. Using WebSockets ensures that the user experience during registration is seamless and efficient, aligning with the tool's focus on simplicity and security within the Gaia-X ecosystem.


- **Backend Orchestration Engine (Node-RED)**: The Node-RED backend receives the data and executes a predefined flow. The flow includes nodes to handle various tasks:
    - **Email Check Node**: Queries the MongoDB to check if the email already exists using a `find` operation.
    - **Password Hashing Node**: Encrypts the password using a secure hashing algorithm before storage.
    - **User Creation Node**: Inserts a new user document into the MongoDB if the email is unique, using an `insert` operation.

- **MongoDB Database**: Serves as the data layer, storing user credentials and profiles. The database is accessed through a secure connection string, and operations are performed using MongoDB's native query language.

### Login Flow

- **Login UI**: Similar to registration, the login interface is constructed using the UI builder node, prompting for email, password, and service selection.

- **Authentication**: The backend Orchestration Engine receives the login credentials and service choice, then performs the following operations:
    - **Credential Verification Node**: Checks the database for the user document matching the email and compares the hashed password.
    - **Service Availability Node**: Determines if the selected service is currently available to the user.
    - **Session Management Node**: Initiates a user session upon successful authentication, generating a session token.

- **Service Selection**: Post-authentication, the user is presented with a dropdown menu to select a service, such as GXUI or the Labeling Wizard. The selection is facilitated through a dynamic query to the database, retrieving available services for the user.

- **MongoDB**: Plays a pivotal role in authentication, storing and indexing user credentials for quick retrieval and validation. Passwords are stored using bcrypt or a similar hashing function to ensure security.

### Database Schema

- **Users Collection**: Stores user documents with fields for `name`, `email`, `password`, `ui`, and `services`. Indexed on `email` for efficient lookups.

### Security Considerations

- All communication with the backend is secured using HTTPS.
- Passwords are never stored in plaintext; only hashed versions are stored.
- The Node-RED backend is configured to prevent unauthorized flow modifications.
- MongoDB access is secured with role-based access control and encryption at rest.

### Modular Design

- The architecture is modular, allowing for new services and nodes to be added to the workflow without significant reconfiguration.
- The UI builder node can be updated to reflect changes in services or user interface requirements.


This architecture provides a secure, scalable, and user-friendly authentication system for the Gaia-X Framework Services, ready for deployment and integration into the larger ecosystem.


# Installation Guide for GXFS Scenario Engine Authentication Tool

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
- Install the Gaia-X Orchestration Engine repository through the following link: [Gaia-X ORCE Repository](https://gitlab.eclipse.org/eclipse/xfsc/oaw).
- Follow the detailed instructions within the repository to install and initialize the ORCE on your system.

## Step Two: Install node-red-contrib-uibuilder
1. Open your command-line interface.
2. Execute the following command to globally install the UI Builder node:
    ```bash
    npm install -g node-red-contrib-uibuilder

3. Proceed to install the required UI libraries into the UI Builder node with:
    ```bash
    npm install bootstrap bootstrap-vue http-vue-loader vue vue-router
## Step Three: Node Dependencies
For the GXFS Toolbox to function properly, it's essential to install additional Node-RED nodes: `node-red-contrib-crypto-js` for encryption and decryption functionalities, and `node-red-contrib-mongodb4` for MongoDB database integration.

## Step Four: Import the Authentication Framework
1. Open the ORCE and navigate to the settings menu.
![Authentication Framework Settings](images/Setting.png)

2. Select "Import" to initiate the import dialogue.
![Authentication Framework Import](images/Import.png)

3. Choose and import the [JSON file](FrameworkCreatorAuthentication.json) that encapsulates the Framework create Authentication and then Confirm the import to integrate the framework into the ORCE.
![Authentication Framework Importjson](images/ImportJson.png)


4. A new subflow will manifest in the left-side palette, indicating a successful import.
![Authentication Framework Subflow](images/AuthFramework.png)

## Step Five: Configure the Authentication UI
1. Within the ORCE, revisit the settings menu and select "Import".
![Authentication UI Import](images/Import.png)

2. Import the [JSON file](AuthenticationJSON.json) specifically associated with the Authentication UI and save the configuration.
![Authentication UI Import](images/AuthImport.png)

3. Following a successful import, the flow items will be displayed in the main workspace.
![Authentication UI ImportAuth](images/AuthFlow.png)

4. Assign a unique URL to your UIBuilder node through the ORCE interface.
![Authentication UI Unique Url](images/AuthUrl.png)

5. Click "Deploy" to activate the workflow.
![Authentication UI Save](images/AuthFirstDeploy.png)

6. Locate the Framework create Authentication in the palette and drag it into the workspace.
![Authentication UI DragCreatorAuthentication](images/DragAuth.png)


7. Connect an inject node to the subflow.
![Authentication UI ConnectInjectNode](images/AuthInject.png)

8. Double-click the inject node and set the msg.uib property to correspond with the UIBuilder URL.
![Authentication UI setMsgui](images/SetUIbmsgAuth.png)

9. Deploy the flow by selecting "Deploy" once again.
![Authentication UI SecondDeploy](images/SecondDeployAuth.png)

10. Test the UI by visiting the assigned UIBuilder URL in a browser to verify its operational status.


## Step Six: Import the GXFS Auth Framework
1. Open the ORCE and navigate to the settings menu.
![GXFS Authentication Framework Settings](images/Setting.png)

2. Select "Import" to initiate the import dialogue.
![GXFS Authentication Framework Import](images/Import.png)

3. Choose and import the [JSON file](GXFS/FrameworkCreatorGXFSAuth.json) that encapsulates the Framework create GXFS Authentication and then Confirm the import to integrate the framework into the ORCE.
![GXFS Authentication Framework Importjson](images/ImportGXFSFlow.png)

4. A new subflow will manifest in the left-side palette, indicating a successful import.
![GXFS Authentication Framework Subflow](images/GXFSAuthFramework.png)

## Step Seven: Configure the GXFS Authentication UI
1. Within the ORCE, revisit the settings menu and select "Import".
![Authentication UI Import](images/Import.png)

2. Import the [JSON file](GXFS/GXFSAuthJSON.json) specifically associated with the GXFS Authentication UI and save the configuration.
![Authentication UI Import](images/ImportGXFSFlow.png)

3. Following a successful import, the flow items will be displayed in the main workspace.
![Authentication UI ImportGXFSFlow](images/GXFSFlow.png)

4. Assign a unique URL to your UIBuilder node through the ORCE interface.
![Authentication UI Unique Url](images/GXFSUrl.png)

5. Click "Deploy" to activate the workflow.
![Authentication UI Save](images/GXFSFirstDeploy.png)

6. Locate the Framework create GXFS Auth in the palette and drag it into the workspace.
![Authentication UI DragCreatorAuthentication](images/DragCreatorGXFS.png)


7. Connect an inject node to the subflow.
![Authentication UI ConnectInjectNode](images/GXFSInjectNode.png)

8. Double-click the inject node and set the msg.uib property to correspond with the UIBuilder URL.
![Authentication UI setMsgui](images/SetUIbmsgGXFS.png)

9. Deploy the flow by selecting "Deploy" once again.
![Authentication UI SecondDeploy](images/GXFSSecondDeploy.png)


## Step Eight: Import the label Auth Framework
1. Open the ORCE and navigate to the settings menu.
![Label Authentication Framework Settings](images/Setting.png)

2. Select "Import" to initiate the import dialogue.
![Label Authentication Framework Import](images/Import.png)

3. Choose and import the [JSON file](GXFS-Label/FrameworkCreatorLabelAuth.json) that encapsulates the Framework create label Authentication and then Confirm the import to integrate the framework into the ORCE.
![Label Authentication Framework Importjson](images/ImportJson.png)

4. A new subflow will manifest in the left-side palette, indicating a successful import.
![Label Authentication Framework Subflow](images/LabelAuthFramework.png)


## Step Nine: Configure the label Authentication UI
1. Within the ORCE, revisit the settings menu and select "Import".
![Authentication UI Import](images/Import.png)

2. Import the [JSON file](GXFS-Label/LabelAuthJSON.json) specifically associated with the label Authentication UI and save the configuration.
![Authentication UI Import](images/LabelJson.png)

3. Following a successful import, the flow items will be displayed in the main workspace.
![Authentication UI ImportLabelFlow](images/LabelFlow.png)

4. Assign a unique URL to your UIBuilder node through the ORCE interface.
![Authentication UI Unique Url](images/LabelUrl.png)

5. Click "Deploy" to activate the workflow.
![Authentication UI Save](images/LabelFirstDeploy.png)

6. Locate the Framework create label Auth in the palette and drag it into the workspace.
![Authentication UI DragCreatorAuthentication](images/DragLabelAuthCreator.png)

7. Connect an inject node to the subflow.
![Authentication UI ConnectInjectNode](images/LabelInject.png)

8. Double-click the inject node and set the msg.uib property to correspond with the UIBuilder URL.
![Authentication UI setMsgui](images/LabelSetuibmsg.png)

9. Deploy the flow by selecting "Deploy" once again.
![Authentication UI SecondDeploy](images/LabelSecondDeploy.png)

# Workflow Design & Implementation / Backend Integration

The Node-RED based backend orchestrates the authentication workflow, managing user registration and login with a clear, visual representation of the process flow. Here's an in-depth look at the implementation details for both processes.

### Workflow Design

A switch node at the beginning of the flow determines whether the incoming request is for registration or login, branching accordingly.

#### Registration Process

- **Input Capture**: The flow captures user inputs like email and password during the registration attempt.
- **Database Check**: A query to MongoDB checks if the email already exists.
- **User Notification**: If an existing email is detected, a modal popup informs the user of the duplicate account.
- **Account Creation**: New accounts have their password hashed and are then added to the database.
- **Confirmation**: A success message confirms account creation.
![Authentication RegisterBE](images/RegisterBE.png)


#### Login Process

- **Credential Capture**: User credentials are captured from the login form submission.
- **Existence Validation**: The database is queried to confirm the existence of the user.
- **Non-existence Notification**: A modal popup alerts the user if the account does not exist.
- **Password Verification**: Entered passwords are compared against the hashed passwords stored in the database.
- **Login Validation**: Incorrect credentials result in a user notification, while correct credentials lead to service redirection.
![Authentication LoginBE](images/LoginBE.png)

### Backend Integration

- **Node-RED**: Chosen for visual programming advantages, making complex workflows understandable and manageable.
- **MongoDB Operations**: Handled via Node-RED's MongoDB nodes, ensuring secure and efficient data management.
- **Security Measures**: Password hashing is implemented using bcrypt for robust security.
- **User Feedback**: Interactive modal popups for user notifications are created with Node-RED dashboard nodes.
- **Service Redirection**: Successful logins trigger redirection to the chosen Gaia-X service, handled within the flow.
- **Error Handling**: Dedicated nodes within the flow manage errors and user communication effectively.

The design of this workflow facilitates a secure and user-centric approach to authentication, allowing for straightforward backend integration and expansion with additional Gaia-X services in the future.



# User Interface Overview

## Registration Process

To register for the GXFS Toolbox, users are required to complete a few essential steps:

- **Full Name**: Enter your full name for personal identification within the system.
- **Email Address**: Provide a valid email address that will serve as your username.
- **Password & Confirmation**: Select a password, enter it, and then type it again in the confirmation field to ensure accuracy.

Once the form is completed, click on the "Sign up" button to create your account.
![Authentication Register User](images/RegisterUser.png)

## Login Process

For returning users, the login process is similarly streamlined:

- **Email Address**: Enter the email address associated with your GXFS Toolbox account.
- **Password**: Type in your password.
- **Service Selection**: From the dropdown menu, select the service you wish to access. Options include services like GXUI, among others.

After inputting your credentials and selecting the desired service, click the "Signin" button to access your account.
![Authentication Login User](images/LoginUser.png)


## Combined Overview

Both registration and login interfaces are designed with user-friendliness in mind, ensuring a seamless experience whether you are signing up for the first time or returning to the service. With a minimalist design, clear instructions, and straightforward navigation, users can quickly and securely access the GXFS Toolbox services. The interfaces also include quick links for additional support and account recovery options to assist users at every step.


# Sample Scenarios

A typical use case for the GXFS Toolbox involves a new user visiting the platform, completing the registration form by providing their full name, email, and password, and then signing up for an account. Upon successful registration, the user returns to the site, logs in with their credentials, selects a desired service from the dropdown—such as the GXUI or Labeling Wizard—and begins their session. This scenario exemplifies the ease of access and simplicity of the user journey from account creation to accessing various services within the GXFS ecosystem.

# Conclusion

In summary, the GXFS Toolbox presents a streamlined, secure, and user-centric approach to authentication and service access within the Gaia-X Framework Services. Throughout this documentation, we have explored the system's architecture, workflow design, backend integration, and the user interface for both registration and login processes. By implementing a straightforward user journey, the toolbox successfully lowers barriers to entry, ensuring that users can quickly leverage the powerful suite of services offered by Gaia-X. As the platform evolves, we anticipate continuous enhancements to further refine user experience and expand service offerings, solidifying the GXFS Toolbox's role as a cornerstone of the Gaia-X ecosystem.



