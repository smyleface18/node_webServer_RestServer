import express from 'express'
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {

    private app =  express();
    private readonly port: number;
    private readonly publicPath: string

    constructor(options: Options) {
        const {port, public_path = 'public'} = options
        this.port = options.port;
        this.publicPath = public_path
    }

    async start () {

        //Middlewares

        //Public Folder

        this.app.use(express.static(this.publicPath));

        this.app.get('/{*splat}', (request, response) => {
            const indexPath = path.join(__dirname,`../../${this.publicPath}/index.html`);
            response.sendFile(indexPath);
        })
        
        this.app.listen(3000,() => {
            console.log(`Server running on port ${3000}`)
        })
    }

}