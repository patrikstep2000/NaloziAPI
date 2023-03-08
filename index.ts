import dotenvSafe from 'dotenv';
import application from './src/app';
dotenvSafe.config();



//for now it's useless but it will be useful later
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    application();
} else {
    application();
}


