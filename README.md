<link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet">

<div align="center">
  <h1 style="font-family:Cookie;font-size:xxx-large">Spacetagram</h1>
  <a href="https://github.com/anthonyftwang/spacetagram/actions/workflows/app-build-test.yml">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/anthonyftwang/spacetagram/app-build-test?logo=github">
  </a>
  <a href="https://codeclimate.com/github/anthonyftwang/spacetagram">
    <img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/anthonyftwang/spacetagram?logo=code-climate">
  </a>
  <a href="https://codeclimate.com/github/anthonyftwang/spacetagram">
    <img alt="Test coverage" src="https://img.shields.io/codeclimate/coverage/anthonyftwang/spacetagram">
  </a>
  <a href="https://spacetagram-anthonyftwang.vercel.app">
    <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fspacetagram-anthonyftwang.vercel.app">
  </a>
  <a href="https://github.com/airbnb/javascript">
    <img alt="Sty;e" src="https://img.shields.io/badge/code%20style-airbnb-blue">
  </a>
  <h3>Image-sharing from the final frontier!</h3>
  <h3><a href="https://spacetagram-anthonyftwang.vercel.app">See the demo</a></h3>
</div>

## What it does 👀

### The bread and butter

- 📸 Fetches images from NASA's **Astronomy Picture of the Day** (APOD) API
- 📅 Displays images along with their dates, titles, explanations, and copyrights
- ❤️ Allows users to like and unlike images

### Some extra goodies

- 💾 Saves likes in the browser's localStorage
- 🌙 Has a toggle for dark mode, because this is space after all
  - Theme preferences are saved across sessions too!
- ⚙️ Lets users change the number of items on each page
- ↔️ Paginates to enable navigation through past photos
  - Page 1 always contains the latest image
  - Each page shows the correct images, accounting for the number of items per page
- 🔽 Collapses and expands long explanation texts
- 🔗 Provides external links to full-resolution media sources
- 🔄 Shows a silhouette of the UI while data loads
- 🎞️ Supports video APODs
- 💬 Uses dialogs to share extra info and communicate fetch errors

## How it's built 🛠

- **React** frontend (with functional components and hooks)
- **Jest/React Testing Library** for testing
- **Material UI** for styled components
- **GitHub Actions** for continuous integration

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Check it out! 🧪

### Prerequisites

You'll need Node v16.13.x installed - you can get the [latest stable version here](https://nodejs.org/en/download/).

### Build the project locally

1. Clone the repo & install the dependencies

```sh
~ git clone https://github.com/anthonyftwang/spacetagram.git
~ cd spacetagram
~ npm install
```

2. Create a `.env` file in the root directory to store local environment variables:

```sh
~ echo -e "REACT_APP_API_URL=https://api.nasa.gov/planetary/apod\nREACT_APP_API_KEY=" > .env
```

3. [Sign up for a free NASA API key](https://api.nasa.gov/), and add it to the `.env` file created in the previous step

4. Start the app

```sh
~ npm start
```

5. Open `localhost:3000` and hack away!

> - This project's ESLint + Prettier config enforces the [Airbnb style guides for React and JavaScript](https://github.com/airbnb/javascript).
> - Components use [PropTypes](https://github.com/facebook/prop-types) for typechecking and self-documentation.
> - All user-facing and `aria-label` strings are contained in `util/strings.js`.
