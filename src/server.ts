import App from './app';

const startServer = async () => {
    const app = new App();
    app.listen(() => {
        console.log(`Server is running on port ${app.port}`);
    });
};

startServer().catch(error => {
    console.error('Error starting server:', error);
});
