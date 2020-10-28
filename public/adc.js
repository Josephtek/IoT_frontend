const adcFields = {
  module: 'adc0',
  gain: 1,
  voltageReference: 'AVCC'
};

var adcHelpers = {
  changeValue: function(selectObject, field) {

    if (field === 'module') {
      adcFields.adcModule = selectObject;
    } else if (field === 'voltageref') {
      adcFields.voltageReference = selectObject;
    } else if (field === 'gain') {
      adcFields.gain = selectObject;
    } else {
      // Nothing
    }
  },

  responseDisplay: function(resp) {
    return `<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
    <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Response
    </label>
       `
       + resp
       + `</div></form>`
  },

  submitClick: async function(object) {
    let request = 'adcOperation' + '?' + jQuery.param(adcFields);
    try {
      const response = await fetch(request, {
        method: 'post'
      }).then(response => response.text())
      .then(response => {
        document.getElementById('mainResponse').innerHTML += adcHelpers.responseDisplay(response);
      });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
  }
}

var adcDisplayer = function () {

  document.getElementById("mainContent").innerHTML = `
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      ADC module selection
    </label>
    <select onChange="adcHelpers.changeValue(this.value, 'module')" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="module">
      <option>ADC0</option>
      <option>ADC1</option>
      <option>ADC2</option>
      <option>ADC3</option>
      <option>ADC4</option>
      <option>ADC5</option>
      <option>ADC6</option>
      <option>ADC7</option>
      <option>ADC8</option>
      <option>ADC9</option>
      <option>ADC10</option>
      <option>ADC11</option>
      <option>ADC12</option>
      <option>ADC13</option>
      <option>ADC14</option>
      <option>ADC15</option>
    </select>
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Gain
    </label>
    <input onChange="adcHelpers.changeValue(this.value, 'gain')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gain" type="text" placeholder="0">
  </div>
  
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Voltage Reference
    </label>
    <select onChange="adcHelpers.changeValue(this.value, 'voltageref')" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="module">
      <option>AVCC</option>
      <option>1.11V</option>
      <option>2.56V</option>
    </select>
  </div>

  <div class="flex items-center justify-between">
    <button onClick="uartHelpers.submitClick(this)" class="m-auto align-middle bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline color" type="button">
      Set
    </button>
  </div>
  </form>
  `;
};

