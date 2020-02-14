# Website v1
The first iteration of my personal website, which I designed and built completely from scratch. The website was created with [Bootstrap 4](https://getbootstrap.com/), [Font Awesome](https://fontawesome.com/), [TypeIt](https://typeitjs.com/), and [clipboard.js](https://clipboardjs.com/). It uses [Gulp 4](https://gulpjs.com/) as a build system and is hosted using [GitHub Pages](https://pages.github.com/).

## Getting Started
### Requirements

#### Node.js
The project requires [Node.js](https://nodejs.org/) version 10 or higher. To check your current version of Node.js, run the following command:
```
node -v
```

#### npm
The project also requires [npm](https://www.npmjs.com/) version 6 or higher. To check your current version of npm, run the following command:
```
npm -v
```

### Cloning the repository
To clone the project, navigate to the directory where you would like it to be saved and run the following command:
```
git clone https://github.com/zachsvanhandel/website-v1.git
```

### Building and running the project
The project uses npm, a package manager for Node.js, to manage dependencies for the project. To install all of the packages needed to run the project, execute the following commands:
```
cd website-v1/
npm install
```

Once all packages have been installed by npm, a live preview of the website can be launched in the browser by executing the following command from the top-level directory of the project:
```
npm start
```

Changes made to *`.html`*, *`.js`*, or *`.scss`* files within the *`src/`* directory will cause the page to dynamically reload in the browser.

## Advanced Usage

### Deploy to GitHub Pages
The website can be deployed to GitHub Pages by running the following command:
```
npm run deploy
```

Note that this command will attempt to publish the contents of the *`dist/`* directory to the repository and branch specified in the `publish()` function of *`gulpfile.js`*. To change the repository the command publishes to, update the `repo` option specified in that function.

### Gulp tasks
* `gulp` the default task to build the project
* `gulp clean` task to remove all generated directories
* `gulp vendor` task to move files from *`node_modules/`* into appropriate directories
* `gulp build` task to build the project (same as `gulp`)
* `gulp dev` task to build the project and open a live preview in the browser that dynamically reloads when changes are made to *`.html`*, *`.js`*, or *`.scss`* files within the *`src/`* directory (same as `npm start`)
* `gulp deploy` task to build the project and deploy it to a GitHub Pages repository (same as `npm run deploy`)

## License
Copyright 2019 Zach Van Handel. Code released under the [MIT](LICENSE.md) license.
