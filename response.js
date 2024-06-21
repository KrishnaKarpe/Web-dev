// Assuming you have the API response data available
const apiResponse = {
  "Success_Records": [
    {
      "Identifier": "A234H",
      "Result": [
        {
          "DownloadCollection": "api.example.com&Recordnumber=7625874524870518060",
          "Identifier": "A234H",
          "Version": "1.0",
          "Language": "English",
          "Country": "Austria",
          "Rep_type": "MSDS",
          "Recn": "7625874524870518060",
          "Rvlid": "AT",
          "Ids_nr": "I1703626622",
          "Sbgvid": "SDS_AT",
          "Doc_typ": "SDS",
          "Supplier": null,
          "Status": "W7",
          "Doc_id": "415C3A9657DF1EDF8BF67AC777108794",
          "Dappl": "pdf",
          "MessageType": null,
          "Message": null,
          "Valid_from": null,
          "Changed_On": "2024-06-21",
          "Gendate": "2024-06-21",
          "Title": "A234H"
        },
        {
          "DownloadCollection": "api.example.com&Recordnumber=7625874524870518065",
          "Identifier": "A234H",
          "Version": "1.0",
          "Language": "English",
          "Country": "Belgium",
          "Rep_type": "MSDS",
          "Recn": "7625874524870518065",
          "Rvlid": "BE",
          "Ids_nr": "I1703626622",
          "Sbgvid": "SDS_BE",
          "Doc_typ": "SDS",
          "Supplier": null,
          "Status": "W7",
          "Doc_id": "415C3A9657DF1EDF8BF6AA0F7870C794",
          "Dappl": "pdf",
          "MessageType": null,
          "Message": null,
          "Valid_from": null,
          "Changed_On": "2024-06-21",
          "Gendate": "2024-06-21",
          "Title": "A234H"
        }
      ]
    }
  ],
  "Failed_Records": []
};

// Get the table body element
const tableBody = document.getElementById('responseTable').getElementsByTagName('tbody')[0];

// Loop through the Success_Records and populate the table
apiResponse.Success_Records.forEach(record => {
  record.Result.forEach(result => {
    // Create a new row
    const row = tableBody.insertRow();

    // Insert cells with data
    const countryCell = row.insertCell();
    countryCell.textContent = result.Country;

    const languageCell = row.insertCell();
    languageCell.textContent = result.Language;

    const docIdCell = row.insertCell();
    docIdCell.textContent = result.Doc_id;

    const downloadLinkCell = row.insertCell();
    const downloadLink = document.createElement('a');
    downloadLink.href = result.DownloadCollection;
    downloadLink.textContent = 'Download';
    downloadLinkCell.appendChild(downloadLink);

    const identifierCell = row.insertCell();
    identifierCell.textContent = result.Identifier;
  });
});