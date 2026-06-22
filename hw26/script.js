console.log('#26. JavaScript homework example file');

function handleButtonClick(buttonId, message) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', () => {
      console.log(message);
    });
  }
}

function trackMousePosition() {
  document.addEventListener('mousemove', (event) => {
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
  });
}

function setupEventDelegation(selector) {
  const list = document.querySelector(selector);
  if (list) {
    list.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        console.log(`Item clicked: ${event.target.textContent.trim()}`);
      }
    });
  }
}

handleButtonClick('myButton', 'Button clicked!');


setupEventDelegation('#testList');


// trackMousePosition();
