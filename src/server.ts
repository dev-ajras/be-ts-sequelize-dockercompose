import App from './app';

const app = new App();
app.listen(() => {
    console.log(`Server is running on port ${app.port}`);
});
