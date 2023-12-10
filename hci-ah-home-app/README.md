# Introduction 
This .NET 7/C# Web API application has been specially developed as a part of the HCI home assessment. 


# General considerations:
1. The solution is designed based on the Clean Architecture principles to emphasize the necessity of Separation of Concerns, Abstractions, and Dependency Inversion.
2.	We will avoid any vendor locking and use agnostic frameworks in order to have more hosting options and flexibility in the future.
3.	We will develop, follow and document the clear naming convention.
4.	We will constantly evaluate and revise our considerations and principals.
5.	We will develop and constantly update Readme.


# General setup
- Deployment: The codebase is built and deployed as a package to an App Service via a GitHub workflow. In a real-world scenario, it should be containerized, pushed to a container registry, and deployed from there.
- GitHub workflow: hci-ah-home-api-app.yml
- Region: West Europe
- Resource group: hci-ah-home-rg
- Resources:
    - Linux App Service plan: hci-ah-home-api-plan
    - Linux App Service: hci-ah-home-api-app

# Code standards & guidelines 

## Naming convention
//TODO

## Api
//TODO

## Protocol
1. We use the Restfull style.
2. We use Resource-based approach, e.g. CRUD /users.