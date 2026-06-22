function createDomElement(tagName, textContent, container) {
  const newElement = document.createElement(tagName);
  newElement.textContent = textContent;
  container.append(newElement);
  return newElement;
}

function setUserInfoCookie(key, value) {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  const cookieValue = `${encodedKey}=${encodedValue}`;
  
  document.cookie = `userInfo=${cookieValue}; max-age=10; path=/`;
  console.log(`Cookie 'userInfo' успішно збережено: ${key}=${value}`);
}

function saveUserInfo(key, value) {
  sessionStorage.setItem(key, value);
  console.log(`Saved ${key}: ${value}`);
}

function getUserInfo(key) {
  const value = sessionStorage.getItem(key);
  console.log(`Retrieved ${key}: ${value}`);
  return value;
}

const myContainer = document.getElementById('js-container');
if (myContainer) {
  const myElement = createDomElement(
    'p', 
    'This paragraph has been added to the specified container.', 
    myContainer
  );
  myElement.classList.add('dynamic-text');
  console.log('Повернене функцією посилання на елемент:', myElement);
  console.log('Перевірка наявності в контейнері:', myContainer.contains(myElement));
}

setUserInfoCookie('language', 'en');
console.log('Поточні cookies на сторінці:', document.cookie);

saveUserInfo('username', 'JohnDoe');
const user = getUserInfo('username');
console.log('Результат роботи функції getUserInfo:', user);

// export { createDomElement, setUserInfoCookie, saveUserInfo, getUserInfo };
