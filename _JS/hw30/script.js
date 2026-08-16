console.log('#11. JavaScript homework example file')

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

console.log(isValidEmail('example@example.com'))
console.log(isValidEmail('example@example.!!!com'))

function isValidUrl(url) {
  const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;
  return urlRegex.test(url);
}

console.log(isValidUrl('https://example.com'))
console.log(isValidUrl('hgis://example.cm'))


