const express = require('express');
const request = require('request-promise');
const https = require('https');

const util = require('./util');

const app = express();

const API_KEY = process.env.API_KEY;
const PAGE_SIZE = 30; // API defaults to 30

app.get('/get', (req, res) => {
    // console.log(req, res);
    [numberToGet, pageNumber, indexOnPage] = util.generatePageAndPosition(req.query.number_of_results, PAGE_SIZE);

    console.log(numberToGet, pageNumber, indexOnPage);

    request({
        uri: 'https://wall.alphacoders.com/api2.0/get.php',
        qs: {
            auth: API_KEY,
            method: req.query.method || 'newest',
            page: pageNumber,
            info_level: 1,
            ...req.query,
        },
        json: true,
    }).then(data => {
        if (data && data.success) {
            const entry = data.wallpapers[indexOnPage];
            console.log(entry);
            if (entry) {
                https.get(entry['url_image'], (resp) => {
                    // console.log(resp.headers);
                    res.setHeader('Content-Type', resp.headers['content-type']);
                    res.setHeader('Content-Length', resp.headers['content-length']);
                    res.setHeader('Content-Disposition', `attachment; filename="${entry.id}.${entry.file_type}"`);
                    resp.pipe(res);
                });
            } else {
                res.status(404).send('Could not retrieve data');
            }
        } else {
            res.status(404).send('Could not retrieve data');
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
