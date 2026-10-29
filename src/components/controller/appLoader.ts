import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;

        if (apiUrl === undefined) {
            throw new Error('API_URL is not defined');
        }

        super(apiUrl, {
            apiKey: process.env.API_KEY ?? '',
        });
    }
}

export default AppLoader;
