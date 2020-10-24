const gpioFields = {
  pin: 'PA0',
  mode: 'Input',
  pullUpResister: 'Enabled',
  outputLevel: 'lowLevel'
};

const changeValue = function(selectObject, field) {

  if (field === 'mode') {
    if (selectObject === 'Input') {
      document.getElementById("addContent").innerHTML = `
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Pull Up Resistor
        </label>
        <select onChange="changeValue(this.value, 'puResistor')"  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="pinSelection">
          <option>Enable</option>
          <option>Disable</option>
        </select>
      </div>`;
      gpioFields.mode = 'Input';
    } else {
      document.getElementById("addContent").innerHTML = `
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Output Voltage
        </label>
        <select onChange="changeValue(this.value, 'outputLevel')"  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="pinSelection">
          <option>High</option>
          <option>Low</option>
        </select>
      </div>`;
      gpioFields.mode = 'Output';
    }
  } else if (field === 'Pin') {
    gpioFields.pin = selectObject;
  } else if (field === 'puResistor') {
    gpioFields.pullUpResister = selectObject;
  } else if (field === 'outputLevel') {
    gpioFields.outputLevel = selectObject;
  } else {
    // Nothing
  }
};

var gpioDisplayer = function () {

  document.getElementById("mainContent").innerHTML = `
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Pin Selection
    </label>
    <select onChange="changeValue(this.value, 'Pin')" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="pinSelection">
      <option>PA0</option>
      <option>PA1</option>
      <option>PA2</option>
      <option>PA3</option>
      <option>PA4</option>
      <option>PA5</option>
      <option>PA6</option>
      <option>PA7</option>
    </select>
  </div>
  
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Mode Selection
    </label>
    <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="modeSelection" onChange="changeValue(this.value, 'mode')">
      <option>Input</option>
      <option>Output</option>
    </select>
  </div>

  <div id="addContent">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Pull Up Resistor
      </label>
      <select onChange="changeValue(this.value, 'puResistor')" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="pinSelection">
        <option>Enable</option>
        <option>Disable</option>
      </select>
    </div>
  </div>
  
  <div class="flex items-center justify-between">
    <button onClick="submitClick(this)" class="m-auto align-middle bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline color" type="button">
      Set
    </button>
  </div>
  </form>
  `;
};

const responseDisplay = function(resp) {
  return `<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
  <div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2">
    Response
  </label>
     `
     + resp
     + `</div></form>`
}

const submitClick = async function(object) {
  let request = 'gpioOperation' + '?' + jQuery.param(gpioFields);
  try {
    const response = await fetch(request, {
      method: 'post',
    }).then(response => response.text())
    .then(response => {
      document.getElementById('mainResponse').innerHTML += responseDisplay(response);
    });
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}
