# Instea - tech radar generator

This repo is fork of [Original ThoughtWorks radar generator](https://github.com/thoughtworks/build-your-own-radar/tree/master)


### Usage

Download new radar data with command below and simply build application. Also don't forget to include credentials JSON from Google service account with name `'instea-dev-b79e01fcea4d.json'` in root of project. This file will be used while downloading content from [Instea tech radar Google Sheet](https://docs.google.com/spreadsheets/d/193QZSj_Xajb0erG4031jOqBkGphUX3NJZ3aCl_1npWs/edit#gid=0)

```bash
npm run download-radar # To refresh radar data

npm install # To install dependencies

npm run build # To build app
```

### Development

```bash
npm install # At the beginning to get all dependencies


npm run dev # To start development server
```
