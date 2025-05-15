import express, { Router } from 'express'
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;

}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string
    private readonly routes: Router

    constructor(options: Options) {
        const { port, public_path = 'public', routes } = options
        this.port = port;
        this.publicPath = public_path
        this.routes = routes
    }

    async start() {

        //*Middlewares
        this.app.use(express.json()) 
        this.app.use(express.urlencoded({ extended: true})) // parsea el urlEncoder

        //*Public Folder
        this.app.use(express.static(this.publicPath));


        //*Routes
        this.app.use(this.routes)


        //* SPA
        this.app.get('/{*splat}', (request, response) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            response.sendFile(indexPath);
        })

        this.app.listen(3000, () => {
            console.log(`Server running on port ${3000}`)
        })
    }

}