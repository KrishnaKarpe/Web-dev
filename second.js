const logoutBtn = document.getElementById('logoutBtn');
const submitBtn = document.getElementById('submitBtn');
// const downloadBtn = document.getElementById('downloadBtn');
const apiResponse = document.getElementById('apiResponse');

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const password = urlParams.get('password');

console.log('Username:', username); // Log the username value
console.log('Password:', password);
logoutBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

submitBtn.addEventListener('click', () => {
  const identifier = document.getElementById('identifier').value;
  const clientSecret = password;
  const clientId = username;

  const url = `https://api-test.syngenta.com/digital/ehs/identifierList/v3.0?Identifier=${identifier}`;
  const headers = new Headers();
  headers.append('client_secret', clientSecret);
  headers.append('client_id', clientId);

  fetch(url, {
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
        populateTable(data);
      apiResponse.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      apiResponse.textContent = `Error: ${error}`;
    });
});

// downloadBtn.addEventListener('click', () => {
//     const clientSecret = password;
//     const clientId = username;
  
//     handleDownload(clientSecret, clientId);
//   });

function populateTable(apiResponse) {
    const tableBody = document.getElementById('responseTable').getElementsByTagName('tbody')[0];
    const countryHeader = document.getElementById('countryHeader');
    const languageHeader = document.getElementById('languageHeader');
  
    // Clear existing table rows
    tableBody.innerHTML = '';
  
    // Clear existing dropdowns
    countryHeader.innerHTML = 'Country';
    languageHeader.innerHTML = 'Language';
  
    // Get unique countries and languages
    const countries = new Set();
    const languages = new Set();
    apiResponse.Success_Records.forEach(record => {
      record.Result.forEach(result => {
        countries.add(result.Country);
        languages.add(result.Language);
      });
    });
  
    // Deduplicate data
    const uniqueData = Array.from(new Set(apiResponse.Success_Records.flatMap(record => record.Result)));
  
    // Create country dropdown
    const countryDropdown = document.createElement('select');
    countryDropdown.add(new Option('All', 'all'));
    Array.from(countries).forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.text = country;
      countryDropdown.add(option);
    });
    countryHeader.appendChild(countryDropdown);
  
    // Create language dropdown
    const languageDropdown = document.createElement('select');
    languageDropdown.add(new Option('All', 'all'));
    Array.from(languages).forEach(language => {
      const option = document.createElement('option');
      option.value = language;
      option.text = language;
      languageDropdown.add(option);
    });
    languageHeader.appendChild(languageDropdown);
  
    // Add event listeners to dropdowns
    countryDropdown.addEventListener('change', filterRows);
    languageDropdown.addEventListener('change', filterRows);
  
    // Populate table with all data initially
    uniqueData.forEach(result => {
      const row = tableBody.insertRow();
      const countryCell = row.insertCell();
      countryCell.textContent = result.Country;
      const languageCell = row.insertCell();
      languageCell.textContent = result.Language;
      const docIdCell = row.insertCell();
      docIdCell.textContent = result.Recn;
      const downloadLinkCell = row.insertCell();
      const downloadLink = document.createElement('a');
      downloadLink.href = '#';
      downloadLink.textContent = 'Download';
      downloadLink.onclick = () => handleDownload(result.DownloadCollection);
      downloadLinkCell.appendChild(downloadLink);
      const identifierCell = row.insertCell();
      identifierCell.textContent = result.Identifier;
    });
  }
  
  function filterRows() {
    const tableBody = document.getElementById('responseTable').getElementsByTagName('tbody')[0];
    const countryDropdown = document.getElementById('countryHeader').getElementsByTagName('select')[0];
    const languageDropdown = document.getElementById('languageHeader').getElementsByTagName('select')[0];
    const selectedCountry = countryDropdown.value;
    const selectedLanguage = languageDropdown.value;
  
    Array.from(tableBody.rows).forEach(row => {
      const country = row.cells[0].textContent;
      const language = row.cells[1].textContent;
  
      if (
        (selectedCountry === 'all' || country === selectedCountry) &&
        (selectedLanguage === 'all' || language === selectedLanguage)
      ) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  
function handleDownload(downloadUrl) {
    const clientSecret = password;
    const clientId = username;
  
    const headers = new Headers();
    headers.append('client_secret', clientSecret);
    headers.append('client_id', clientId);
  
    const requestOptions = {
      headers: headers,
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };
  
    fetch(downloadUrl, requestOptions)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
