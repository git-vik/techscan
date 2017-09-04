import express from 'express';
import path from 'path';
import open from 'open';

/* eslint-disable no-console */

const port = 80;
const app = express();

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  	if (err) {
    	console.log(err);
  	} else {
    	open(`http://vikasgupta.me/techscan:${port}`);
  	}
});
