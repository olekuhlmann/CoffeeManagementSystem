/**
 * This is a scrip to create a backup of the database and upload it to dropbox using process.env.DROPBOX_ACCESS_TOKEN.
 * Prior to using this script, it is necessary to set the DROPBOX_ACCESS_TOKEN in the .env file.
 *  
 */


// backend/scripts/backup.js
const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });

const backupDatabase = async () => {
  const dbPath = path.resolve(__dirname, '../tmp/database.sqlite');
  const backupPath = `/backups/backup_${new Date().toISOString().replace(/:/g, '-')}.sqlite`;

  try {
    const contents = fs.readFileSync(dbPath);
    await dbx.filesUpload({ path: backupPath, contents });
    console.log(`Backup successful: ${backupPath}`);
  } catch (error) {
    console.error('Error uploading to Dropbox:', error);
  }
};

backupDatabase();
