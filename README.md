# CVWO Assignment
This repo was forked and edited from the provided sample CVWO sample react app

### Note:
I have deployed the backend on Render and frontend on Netlify and so if you want to take a look at the end-product, simply go to [https://dazzling-queijadas-b8cd49.netlify.app](https://dazzling-queijadas-b8cd49.netlify.app) (best experience on desktop and Google Chrome). However, since the backend is running on the free version of Render, the server gets spun down with inactivity. If the website is unresponsive at the beginning, you may have to wait a few minutes. 

Below are some instructions if you wish to run the webapp locally:

### Running both backend and frontend locally

1. Follow the instructions for the [CVWO-backend](https://github.com/justsparsh/CVWO-backend) repository before beginning with this.
2. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) this repo.
3. [Clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) **your** forked repo.
4. Open your terminal and navigate to the directory containing your cloned project.
5. Install dependencies for the project by entering this command:

```bash
yarn install
```
6. Uncomment the local url end-point in CVWO-frontend/src/data/API_URL.tsx

7. Run the app in development mode by entering this command:

```bash
yarn start
```

8. Open [http://localhost:3001](http://localhost:3001) to view it in the browser. [http://localhost:3000](http://localhost:3000) should be occupied by your rails server.

### Running only frontend locally

1. Follow Steps 1-5 from above
2. You can skip step 6 as the API end-point by default is set to the deployed backend
3. Follow Step 7


## Acknowledgements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project uses [MUI](https://mui.com/),
[TypewriterJS](https://github.com/tameemsafi/typewriterjs#readme),
[ESLint](https://eslint.org/), [Prettier](https://prettier.io/).
