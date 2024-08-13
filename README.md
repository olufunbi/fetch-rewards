# Olufunbi Babalola Fetch Coding Exercise - SDET

----
Installation and Project Running Rubric
----

### Preliminary Requirements

----
- IF on MacOS, Ensure Xcode is installed on your System
- IDE is setup
- Node.js is installed
- Git username and password is configured
- SSH Keys have been configured (Optional since it's a public repo)

### Clone Repository & Install binaries

----
- [ ] Create a directory where your project will exist `mkdir <name of your desired folder>`
- [ ] Navigate into the folder with `cd <name of the folder that you just created>`
- [ ] Copy and Paste this `git clone https://github.com/olufunbi/fetch-rewards.git`
- [ ] Navigate in to the repository by running `cd fetch-rewards`
- [ ] Open the repository and run `npm ci` to run a clean install of all binaries
----
### Running the project
The Project can be run in multiple ways...

---

#### 

- [ ] Open your preferred IDE e.g Visual Studio, Webstorm 
- [ ] Open Terminal
- [ ] Ensure you are in the directory where your project exists

#### Option 1: Run in headless mode
- [ ] Run the follwing script in the terminal `npx cypress run` 
- [ ] Navigate to the `cypress/fixtures` folder to check the `weighings.txt` file 


#### Option 2: Run in headed mode with GUI
- [ ] Run the follwing script in the terminal `npx cypress run --headed`
- [ ] Navigate to the `cypress/fixtures` folder to check the `weighings.txt` file 
----
### Generating Report
This is a reports structure I added, It's optional but you can generate a report by following these steps:

---
- [ ] Still within your terminal and the same directory of your where the project is located. 
- [ ] Run the following script in the terminal `npm run clean:report`
- [ ] Run the follwing script in the terminal `npx cypress run` 
- [ ] Run the following script in the terminal `npm run generate:report`

### Libraries and Framework

***
- [ ] [Cypress: 13.13.2](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [ ] [Cypress Cucumber Preprocessor: 4.3.1](https://www.npmjs.com/package/cypress-cucumber-preprocessor)
