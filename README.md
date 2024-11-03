# Web Engineering Coding Playground Template

This repository is designed as the foundation for coding playgrounds in the Web Engineering course. It offers a structured space for experimenting with and mastering various web development technologies and practices. 
The project is based on [this](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting) repository from MDN.

The project introduces a lot of code smells for you to tackle. 
**Lets get coding!**

## Submission Details and Deadlines
* Coding playgrounds are **individual** work
* There will be 2 serparate submissions:
  * [Base Playgrounds](#base-coding-playgrounds): Submission Deadline **03.11.2024**
  * [Extended Playgrounds](#extended-coding-playgrounds): Submission Deadline **16.01.2025**
* The playgrounds will be guided through in our sessions - still there will be distance work!
* Use this base template to create your project repository.
* Each playground is linked in the corresponding course section.
* You can find the submissions at the bottom of the Moodle course.
  

## Features

- Wonderful UI-design :heart_eyes:
- Loads bear data using [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) :bear:
  - Original Wikipedia Page can be found [here](https://en.wikipedia.org/wiki/List_of_ursids)
- Worst JS coding practices :cold_sweat:
- No Build and Dependency Management at all :fire:



# Base Coding Playgrounds

## K.O. Criteria
* No JS Frameworks allowed to solve the base coding playgrounds (e.g. Vue.js, Angular, React, Svelte,...) - don't panic we will come to them!
* No CSS Libraries allowed (e.g. Bootstrap, Material, Tailwind, ...)

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 1. JS Playground (10 Pts.)
The provided base project template contains some bugs and bad JS coding practices for you to fix in your first playground. Take a look into the component files and get a grasp of the inner workings of the provided project.
> **ATTENTION: After finishing the JS Playground please create a commit or branch and link it below. Otherwise it is not possible to grade your 1. submission, since we will switch to TypeScript afterwards!**
> 
> **This is my JS Playground commit/branch:** <LINK_TO_YOUR_COMMIT>

**Tasks:**
Fix application code and answer the questions:
* (2) Adapt the code to use ``async/await`` instead of the ``then()``-callback hell and refactor the functions to use arrow function syntax instead of ``function()``-syntax.
* (2) Add proper error handling to the code using ``try/catch`` and provide useful error messages to the users. Additionally, check the image URL availability before rendering the images in HTML. Provide placeholder images if the given URL does not exist.
* (1) Extract the range value from the provided Wikitext (response from the API). Examine the provided Wikitext format inside `extractBears` function. 
* (1) Split the code into separate modules with regards to clean separation of concerns.
* (1) Eliminate all other bad coding practices you can find. 
* (3) Answer the following questions and provide some examples inside the ``Readme.md`` file. 

>  **What bad coding practices did you find? Why is it a bad practice and how did you fix it?**

- **Use of `var` instead of let/const:**
  - **Why it's bad:** `var` has function-level scope, leading to potential hoisting and reassignment issues.
  - **Fix:** Replaced `var` with `const` for constants.
``` JS
// Before
export function toggleComments() {
    var showHideBtn = document.querySelector('.show-hide');
    var commentWrapper = document.querySelector('.comment-wrapper');

// After
export function toggleComments() {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');
```

- **Direct DOM manipulation via innerHTML**
  - **Why it's bad:** Can cause security issues (XSS) and performance overhead.
  - **Fix:** Used `createElement` and `appendChild` for safer, more efficient DOM updates.
``` JS
// Before
moreBearsSection.innerHTML += `
  <div>
    <h3>${bear.name} (${bear.binomial})</h3>
    <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
    <p><strong>Range:</strong> ${bear.range}</p>
  </div>
`;

// After
const bearDiv = document.createElement('div');
const bearTitle = document.createElement('h3');
bearTitle.textContent = `${bear.name} (${bear.binomial})`;

const bearImg = document.createElement('img');
bearImg.src = bear.image;
bearImg.alt = bear.name;
bearImg.style.width = '200px';

const bearRange = document.createElement('p');
bearRange.innerHTML = `<strong>Range:</strong> ${bear.range}`;

bearDiv.appendChild(bearTitle);
bearDiv.appendChild(bearImg);
bearDiv.appendChild(bearRange);
moreBearsSection.appendChild(bearDiv);
```

- **Magic strings and numbers:**
  - **Why it's bad:** Hard to maintain and modify if values are scattered throughout the code.
  - **Fix:** Extracted them into constants for easy future updates.
``` JS
// Before
if (showHideText == 'Show comments') {
  showHideBtn.textContent = 'Hide comments';
} else {
  showHideBtn.textContent = 'Show comments';
}

// After
const SHOW_COMMENTS = 'Show comments';
const HIDE_COMMENTS = 'Hide comments';

if (showHideText === SHOW_COMMENTS) {
  showHideBtn.textContent = HIDE_COMMENTS;
} else {
  showHideBtn.textContent = SHOW_COMMENTS;
}
```

- **No input validation or sanitation:**
  - **Why it's bad:** There's no input validation or sanitization for user inputs (`nameField` and `commentField`) in the comment form. This leaves the application vulnerable to Cross-Site Scripting (XSS) attacks.
  - **Fix:** Implement input sanitization and validation to strip or encode any malicious code before using the input in the DOM.
``` JS
// Before
const nameValue = nameField.value;
const commentValue = commentField.value;

// After
const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

const nameValue = sanitizeInput(nameField.value);
const commentValue = sanitizeInput(commentField.value);
```


## 2. Dependency- and Build Management Playground (10 Pts.)
Build the application with ``npm`` and a build and a dependency management tool of your choice (e.g. [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), or others). 

Here are some additional resources: [Package Management and Bundling](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2-Package-Management,-Build-Management-and-Modules), [Vite Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.1-Vite-Web-Application-Setup), [Webpack Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/2.2-Webpack-Web-Application-Setup).

**Tasks:**
* (1) Integrate `npm` and a build management tool into your project.
* (2) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.
* (2) Use ESLint and Prettier inside your project - rulesets can be found below.
* (1) Keep your builds clear and add dependencies to the right build (e.g. do not add dev dependencies inside the production build and vice versa).
* (1) Define the following tasks within `npm scripts`:
  * `dev`: starts the development server
  * `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
  * `lint`: runs ESLint on all  `.js` and `.ts` files in your projects `/src` directory
  * `lint:fix`: runs and also fixes all issues found by ESLint
  * `format`: formats all `.js` and `.ts` files in your projects `/src` directory
  * `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.
* (1) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).
* (2) Answer the question at the end of this section inside ``Readme.md`` file: 


**ESLint Configurations**

Use ESLint configs [standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and [TypeScript ESLint Plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).
Your `.eslintrc` file should have the following extensions:
```.eslintrc.yml
...
extends:
  - standard-with-typescript
  - plugin:@typescript-eslint/recommended
  - plugin:prettier/recommended
  - prettier
...
```
 
**Prettier Configurations**

Apply the following ruleset for Prettier:
``` .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80
}
```

>  **What improvements in your codebase were introduced by using TS instead of JS? Name at least 3 and explain why.**

**Type Safety and Early Error Detection:**
- **Explanation:** TypeScript adds static typing to JavaScript, allowing to define types for variables, function parameters, and object properties.
- **Benefit:** This helps catch type-related errors at compile time rather than at runtime, reducing bugs and making the code more robust.
- **Example:** In `api.ts`, defined interfaces like `ImageInfo`, `Page`, and `QueryResult`, ensuring that the data structures from API responses match expected formats.

**Enhanced Code Readability and Maintainability:**
- **Explanation:** Explicit type annotations and interfaces make the code more self-documenting.
- **Benefit:** Improves readability and makes it easier for developers to understand, maintain, and refactor the codebase.
- **Example:** In `bears.ts`, defining the Bear interface clarifies what properties a bear object should have, helping with code comprehension.

**Improved Developer Tooling and IntelliSense Support:**
- **Explanation:** TypeScript provides better integration with IDEs, offering features like intelligent code completion, refactoring tools, and error highlighting.
- **Benefit:** Increases developer productivity and reduces the likelihood of errors.
- **Example:** When using `document.querySelector<HTMLElement>`, the editor can provide accurate suggestions and type checks based on the specified element type.

## 3.	CI/CD Pipeline Playground (5 Pts.)
Implementation of a CI/CD pipeline to automate the development and deployment process – write automated tests.

Here are some additional resources: [GitHub Actions Tutorial](https://github.com/leonardo1710/WebEngineeringSDE/wiki/3.2-CI-CD-Pipeline-with-Github-Pages-and-Github-Actions) and [GitHub Actions Docs](https://docs.github.com/en/actions).

**Tasks:**
* (1.5) Write at least 2 meaningful unit tests (use [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)) for your project and configure the following tasks in ``npm scripts``:
  * `test`: runs all files that include `.test.` or `.spec.`, e.g.: `example.test.ts`
  * `test:coverage`: runs tests like `test` but also creates a test coverage report
* (1) Configure **2 Workflows** in GitHub Actions, one for development and one for deployment:
  * Create a `development` branch inside your repository
  * (1) Development Workflow should at least test and lint your code when developers push to branch `development`
  * (1) Deployment Workflow is triggered when developers push into `main` branch. It should at least test, lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice). 
* (0.5) Reuse existing workflows or jobs whenever possible! 

## 4.	Accessibility Playground (5 Pts.)
You might have noticed that the base project has a number of accessibility issues - your task is to explore the existing site and fix them.
Use the tools presented in our accessibility workshop to test the accessibility in your project.

**(0.5) Color** 

Test the current color contrast (text/background), report the results of the test, and then fix them by changing the assigned colors.

**Findings:**
The color contrast of the text against the background has been checked using the WebAIM Contrast Checker. Among others, the following issues were identified:
- Body/Header Text and Body/Header Background Text Color: Contrast ratio of 2.79:1, which fails all the WCAG criteria, since it is below the minimum for small and medium text.
- Title Text Color on Background: Contrast ratio of 1.34:1, below the recommended minimum contrast ratio of 3:1 for large text.

**Fixes Implemented:**
- Body/Header Text and Body/Header Background Text Color: Changed text color to #444, increasing the contrast ratio to 12.13:1.
- Title Text Color on Background: Updated link color to #900, increasing the contrast ratio to 10.69:1.

**(0.5) Semantic HTML**

Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

**Findings:**
- Lack of Semantic Elements: The page used `<div>` and `<font>` tags instead of semantic HTML5 elements, making it difficult for screen readers to interpret the structure.
- Improper Heading Structure: Headings were not properly nested, and heading levels were skipped, confusing users who rely on headings for navigation.
- Non-Descriptive ARIA Roles: Missing or incorrect ARIA roles hindered effective navigation for assistive technologies.

**Fixes Implemented:**
- Semantic Elements: Replaced generic elements with semantic HTML5 elements such as `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
- Proper Heading Hierarchy: Ensured headings follow a logical order using `<h1>`, `<h2>`, and `<h3>` tags.
- Improved Navigation: Updated interactive elements to use appropriate tags (e.g., changed the comments toggle from a `<div>` to a `<button>`).

**Example Updates:**
``` html
<!-- Changed from -->
<div class="header">
  <font size="7">Welcome to our wildlife website</font>
</div>

<!-- Changed to -->
<header>
  <h1>Welcome to our wildlife website</h1>
</header>
```

**(0.5) Audio** 

The ``<audio>`` player isn't accessible to hearing impaired (deaf) people — can you add some kind of accessible alternative for these users?

**Findings and Fixes:**
- **Issue:** The `<audio>` player lacked an accessible alternative for users who are deaf or hard of hearing.
- **Solution:** Added a text transcript of the audio content directly below the `<audio>` element, enclosed in a `<div class="audio-transcript">`.

**Implementation:**
``` html
<audio controls>
  <source src="media/bear.mp3" type="audio/mp3">
  <source src="media/bear.ogg" type="audio/ogg">
  <p>Your browser doesn't support HTML5 audio players.</p>
</audio>

<div class="audio-transcript">
  <h3>Audio Transcript</h3>
  <p>
    [Insert detailed transcript of the audio content here.]
  </p>
</div>
```

**(1) Forms** 
  * The ``<input>`` element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. Fix this issue by adding a label that is only accessible to screen readers.
  * The two ``<input>`` elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.

**Findings:**
- The search input lacked an associated label, making it inaccessible to screen reader users.
- Labels were present but not properly associated with their corresponding input fields.

Fixes Implemented:
- Added a visually hidden `<label>` using the `class="visually-hidden"` and associated it with the input using `for` and `id` attributes.
- Added `id` attributes to `<input>` elements and associated them with their `<label>` elements using the `for` attribute.
- Introduced a `.visually-hidden` class to hide elements visually while keeping them accessible to screen readers.

**Example Updates:**
``` html
<!-- Search Form -->
<form class="search">
  <label for="search" class="visually-hidden">Search</label>
  <input type="search" name="q" id="search" placeholder="Search query">
  <input type="submit" value="Go!">
</form>

<!-- Comment Form -->
<form class="comment-form">
  <div class="flex-pair">
    <label for="name">Your name:</label>
    <input type="text" name="name" id="name" placeholder="Enter your name">
  </div>
  <div class="flex-pair">
    <label for="comment">Your comment:</label>
    <input type="text" name="comment" id="comment" placeholder="Enter your comment">
  </div>
  <div>
    <input type="submit" value="Submit comment">
  </div>
</form>
```

``` css
.visually-hidden {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

**(0.5) Comment section**

The show/hide comment control button is not currently keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it using the tab key, and activating it using the return key?

**Findings:**
- Issue: The show/hide comments control was a `<div>` element, which is not focusable or operable via keyboard.
- Impact: Users navigating via keyboard could not access or activate the comments toggle.

**Fixes Implemented:**
- Changed Element: Replaced the `<div class="show-hide">` with a `<button class="show-hide">` to make it natively keyboard-accessible.
  
**Example Update:**
``` html
<!-- Changed from -->
<div class="show-hide">Show comments</div>

<!-- Changed to -->
<button class="show-hide">Show comments</button>
```

**(1) The table**

The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?

**Findings:**
- The table lacked a `<caption>`, making it unclear what data it presented.
- Missing structural elements like `<thead>`, `<tbody>`, and proper use of `<th>` and `<td>` tags.
- No scope attributes to associate header cells with data cells.

**Fixes Implemented:**
- Added `<caption>` to provide a summary of the table's content.
- Used `<thead>` and `<tbody>` to define the table's header and body sections.
- Applied `<th>` elements for headers with appropriate scope attributes.

**Example Update:**
``` html
<table>
  <caption>Bear Types and Characteristics</caption>
  <thead>
    <tr>
      <th scope="col">Bear Type</th>
      <th scope="col">Coat</th>
      <th scope="col">Adult size</th>
      <th scope="col">Habitat</th>
      <th scope="col">Lifespan</th>
      <th scope="col">Diet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Wild</th>
      <td>Brown or black</td>
      <td>1.4 to 2.8 meters</td>
      <td>Woods and forests</td>
      <td>25 to 28 years</td>
      <td>Fish, meat, plants</td>
    </tr>
    <!-- Additional rows -->
  </tbody>
</table>
```

**(1) More Findings**

**Images Missing alt Attributes:**
- **Issue:** Images lacked alt text, making them inaccessible to users relying on screen readers.
- **Fix:** Added descriptive alt attributes to all `<img>` elements.

``` html
<img src="media/wild-bear.jpg" alt="A wild bear in its natural habitat">
```

**Non-Descriptive Link Text:**
- **Issue:** Some links used non-descriptive text like "Click here".
- **Fix:** Updated links to have descriptive text that conveys context.

``` html
<!-- Changed from -->
<a href="bears.html">Read more</a>

<!-- Changed to -->
<a href="bears.html">Learn more about bear species</a>
```

<img src="media/WAVE_report.png" alt="WAVE report showing 0 errors, 0 contrast errors, 6 alerts and 9 features" width="200"/>

The image above depicts the report generated by the WAVE extension, showing that all errors have been solved. The presence of six alerts is a bit contradictory, since these alerts tell us that there are redundant alternative texts, which are also shown as Features.

# Extended Coding Playgrounds
Please create a new independent Repository for these playgrounds and submit a link to it in the Moodle submission. 
Additionally, provide a description of how to start your frontend and backend services inside the `README.md`.

## Submission
Submit your coding repository link in Moodle. Send me an invitation to your repository if it is set to private:
> GitHub: leonardo1710
> 
> GitLab: leon.freudenthaler@fh-campuswien.ac.at

## 5. Migrate to a Frontend Framework (10 pts.)
In this playground you will migrate your application to a frontend framework of your choice.

**Tasks**:
* Migrate your application to a frontend framework of your choice (e.g. React, Angular, Vue.js, Svelte,...)
  * All previous features should still work
  * The application still should use build and dependency management
* Adapt your `npm scripts` if necessary

## 6. Integrate a Backend Framework (10 pts.)
In this playground you will use a backend framework of your choice and connect it with an API to your frontend application. 

**Tasks**:
* (3) Setup a backend framework of your choice
* (2) Create an API your frontend will be connected to (REST, GraphQL, gRPC, you choose...)
* (2) Your backend should now request the bear data from presented Wikipedia API
* (3) Replace the frontend Wikipedia API calls with calls to your backend - the functionality of your frontend should work as before!
* (Optional): you may want to introduce some sort of caching layer for Wikipedia API requests


## 7. Containerize your application (10 pts.)
Dockerize your frontend and backend applications. It should be possible to start all services in the corresponding mode (development, production) with a single command (e.g. use Docker Compose for this).

**Tasks**:
* (6) Create **multi-stage Dockerfiles** for your applications (depending on your frameworks):
  * The frontend Dockerfile should: 1. run the app in a development environment 2. build the app 3. serve build artefacts over Nginx
  * The backend Dockerfile should: 1. run the app in a development environment 2. build the app if there is a build step in your framework (optional) 3. serve the app 
* (4) Create two docker-compose files to orchestrate you applications in ``development`` and ``production`` mode:
  * Define ports and dependencies
  * Define corresponding stage (development, production)
  * Use environment variables if possible
* Your application should start with the following commands:
  * Development: `docker-compose -f docker-compose.yml up --build`
  * Production: `docker-compose -f docker-compose.prod.yml up --build`