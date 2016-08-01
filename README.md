# README #

This source code is the repository for the front-end for OST.  You will need to run the backend server to correctly 
run the site.  Additional information will later when a full ansible/vagrant that run the model.

### What is this repository for? ###

* Quick summary
* Version
  Pre-Beta Phase

* Style Guide
  This project will be following 'johnpapa' styleguide for angularjs.
  https://github.com/johnpapa/angular-styleguide
  
* Design Language
  We're utilizing Google's Material Design principles in our application.
  http://www.google.com/design/spec/material-design/introduction.html

* Icons
  Icons should follow material design principle.
  http://www.google.com/design/spec/style/icons.html#icons-product-icons
  
  A list of free/open available icon can be located at
  https://design.google.com/icons/

* Responsive UI
  http://www.google.com/design/spec/layout/responsive-ui.html#responsive-ui-breakpoints
  
1. Summary and detail view content in layouts
  
  Layouts under 600dp wide may fill the screen with a single level of content hierarchy (either summary or detail content, but not both).
  Layouts over 600dp wide may place two levels of content hierarchy on the screen (both summary and detail content).
  
2. Max screen widths
  
  Layouts over 1600dp wide may let the layout grow until it hits a max width. At this point, the grid may do one of the following:
  
  Become center aligned with increased margins
  Remain left aligned while the right margin grows
  Continue to grow while revealing additional content
  
  ![Alt text](docs/layout_adaptive_breakpoints_01.png "Responsive UI Layout")

  
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
  You will to have npm, gulp, and bower install.  You can install gulp and bower locally or globally.  Check the 
  installation setup with respect to your operating system.
  
* Installation

After node package manager is installed, go to root directory and install package.json on the local directory.
```
npm install
```

Install bower to the local folder.
```
npm install -g bower

bower install
```

* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Joeny Bui, Ricky Do, Keven Lee