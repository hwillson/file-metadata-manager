import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import Excel from 'exceljs';
import md5 from 'md5';

import filesCollection from '../collection';

const loadMetadata = () => new Promise((resolve, reject) => {
  const workbook = new Excel.Workbook();
  const metadataSeedFile = Meteor.settings.private.files.metadataSeedFile;

  workbook.xlsx.readFile(metadataSeedFile).then(() => {
    const worksheet = workbook.getWorksheet(1);

    const metadataValues = [];

    const colHeaders = [];
    worksheet.getRow(2).values.forEach((colHeader) => {
      if (colHeader) {
        colHeaders.push(colHeader);
      }
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber >= 3) {
        const rowValues = {};
        row.eachCell((cell, colNumber) => {
          try {
            let colHeader = colHeaders[colNumber - 1];
            let cellValue;
            if (colHeader.indexOf('num_') === 0) {
              colHeader = colHeader.replace('num_', '');
              cellValue = parseInt(cell.value, 10);
            } else {
              cellValue =
                !_.isEmpty(cell.value)
                  ? cell.value.replace(/\n/g, ' ').trim()
                  : null;
            }

            if (cellValue) {
              if (_.has(rowValues, colHeader)) {
                rowValues[colHeader].push(cellValue);
              } else if (colHeader.endsWith('s')) {
                rowValues[colHeader] = [cellValue];
              } else if (colHeader === 'path') {
                const pathParts = cellValue.split('/');
                rowValues.filename = pathParts[pathParts.length - 1];
                pathParts.pop();
                rowValues.path = pathParts.join('/');
                rowValues.uid = md5(`${rowValues.path}/${rowValues.filename}`);
              } else {
                rowValues[colHeader] = cellValue;
              }
            }
          } catch (error) {
            console.log(error, cell.value);
            throw error;
          }
        });
        if (!_.isEmpty(rowValues) && (_.keys(rowValues).length > 2)) {
          metadataValues.push(rowValues);
        }
        console.log(`Done row ${rowNumber}.`);
      }
    });

    resolve(metadataValues);
  }).catch((error) => {
    reject(error);
  });
});

const importMetadataSeedFiles = () => {
  const metadataValues = Promise.await(loadMetadata());
  metadataValues.forEach((metadata) => {
    filesCollection.insert(metadata);
  });
};

export default importMetadataSeedFiles;
