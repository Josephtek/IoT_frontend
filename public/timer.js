const timerFields = {
  timer: 'PA0',
  frequency: undefined,
  dutycycle: undefined
};

var timerHelpers = {
  responseDisplay: function(resp) {
    return `<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
    <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Response
    </label>
       `
       + resp
       + `</div></form>`;
  },

  changeValue: function(value, field) {

    if (field === 'timer') {
      timerFields.timer = value;
    } else if (field === 'frequency') {
      timerFields.frequency = value;
    } else if (field === 'dutycycle') {
      timerFields.dutycycle = value;
    } else {
      // Nothing
    }
  },

  errorResponse: function() {
    return `<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
    <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Please provide valid frenquency and duty cycle
    </label></div></form>`;
  },
  
  submitClick: async function(object) {
    if (timerFields.dutycycle === undefined || timerFields.frequency === undefined) {
      document.getElementById('mainResponse').innerHTML += this.errorResponse();
    } else {
      let request = 'timerOperation' + '?' + jQuery.param(gpioFields);
      try {
        const response = await fetch(request, {
          method: 'post',
        }).then(response => response.text())
        .then(response => {
          document.getElementById('mainResponse').innerHTML += timerHelpers.responseDisplay(response);
        });
      } catch(err) {
        console.error(`Error: ${err}`);
      }
    }
  }
}

var timerDisplayer = function()  {

  document.getElementById("mainContent").innerHTML = `
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Timer Selection
    </label>
    <select onChange="timerHelpers.changeValue(this.value, 'timer')" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="pinSelection">
      <option>Timer0</option>
      <option>Timer1</option>
      <option>Timer2</option>
      <option>Timer3</option>
      <option>Timer4</option>
      <option>Timer5</option>
    </select>
  </div>
  
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Frequency
    </label>
    <input onChange="timerHelpers.changeValue(this.value, 'frequency')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="frequency" type="text" placeholder="25khz">
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Duty Cycle
    </label>
    <input onChange="timerHelpers.changeValue(this.value, 'dutycycle')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dutycycle" type="text" placeholder="50%">
  </div>
  
  <div class="flex items-center justify-between">
    <button onClick="timerHelpers.submitClick(this)" class="m-auto align-middle bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline color" type="button">
      Set
    </button>
  </div>
  </form>
  `;
};
