const argv = require('minimist')(process.argv.slice(2));

const campaignId = argv.campaign || '3590';
const campaignRunId = argv.run || '7636';
const count = argv.count || 25;

const request = require('superagent');
const url = `https://www.dosomething.org/api/v1/reportbacks?campaigns=${campaignId}&runs=${campaignRunId}&status=approved,promoted&count=${count}`;

const download = require('download-file');
const downloadOptions = {
  directory: './downloads/',
  filename: 'default.png',
};

request(url)
  .then(res => res.body.data)
  .then(reportbacks => reportbacks.forEach((reportback, index) => {
    downloadOptions.filename = `${campaignId}_${campaignRunId}-${index}.png`;
    const mediaUri = reportback.reportback_items.data[0].media.uri;

    download(mediaUri, downloadOptions, function(err) {
      if (err) console.error(err);
      console.info('downloaded', index);
    })
  }));
