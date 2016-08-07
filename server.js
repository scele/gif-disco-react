import express from 'express';
import fs from 'fs';
import jsonfile from 'jsonfile';
import bodyParser from 'body-parser';

const app = express();

app.set('port', (process.env.API_PORT || 3001));

// Allow requests from pages served by Webpack
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.json());

const BACKGROUNDS_FILE = 'client/src/backgrounds.json';
const readBackgrounds = () => jsonfile.readFileSync(BACKGROUNDS_FILE);
const writeBackgrounds = (obj) => jsonfile.writeFileSync(BACKGROUNDS_FILE, obj, {spaces: 2});

app.use('/content', express.static('content'));

app.get('/api/scenes', (req, res) => {
  res.json(readBackgrounds());
});

app.post('/api/scenes/:sceneId', (req, res) => {
  console.log(`Saving scene ${req.params.sceneId}:`, req.body);
  let scenes = readBackgrounds();
  scenes[req.params.sceneId] = req.body;
  writeBackgrounds(scenes);
  res.sendStatus(200);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});