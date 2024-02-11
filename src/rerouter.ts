import express from 'express';
import path from 'path';
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, 'dist')));

// Redirect all pages under /src/pages/ to /
app.get('/contact.html', (req, res) => {
  console.log("ui")
  res.end(__dirname + '/src/pages/Contact.html');
});