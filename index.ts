import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import Messenger from './src/controllers/createMessage';
import { Settings } from './settings';

const app = express();

const dataConnection = (
    userName: string,
    password: string,
    mongoDbPort: number,
    mongoDbName: string,
    mongoDbHost: string): string => {
    return `mongodb://${userName}:${password}@${mongoDbHost}:${mongoDbPort}/${mongoDbName}`;
}

// convert it to typescript notation
const PORT: number = 3000;
const userName: string = "meuusuario";
const password: string = "minhasenha";
const mongoDbPort: number = 27017;
const mongoDbName: string = "meubanco";
const mongoDbHost: string = "db";

// instance of Messenger class
const messenger = new Messenger(Settings.PORT);
const uri: string = dataConnection(Settings.MONGO_USER, Settings.MONGO_PASSWORD, Settings.MONGO_PORT, Settings.MONGO_DB, Settings.MONGO_HOST);


// mongoose connection
mongoose.connect(uri, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(messenger.messagePrint())
);

app.listen(Settings.PORT, () =>
    console.log(messenger.messagePrint())
);

