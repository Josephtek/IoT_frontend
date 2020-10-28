const uartFields = {
  baudRate: 9600,
  bytesToTransmit: undefined,
  numberBytesToReceive: 0,
  timeout: 0
};

var uartHelpers = {
  changeValue: function(selectObject, field) {

    if (field === 'baudrate') {
      uartFields.baudRate = selectObject;
    } else if (field === 'bytestosend') {
      uartFields.bytesToTransmit = selectObject;
    } else if (field === 'numberbytesreceive') {
      uartFields.numberBytesToReceive = selectObject;
    } else if (field === 'timeout') {
      uartFields.timeout = selectObject;
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

  _objectWithoutProperties: function(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  },

  submitClick: async function(object) {
    let properties = this._objectWithoutProperties(uartFields, 'bytesToTransmit');
    let request = 'uartOperation' + '?' + jQuery.param(properties);
    try {
      const response = await fetch(request, {
        method: 'post',
        body: uartFields.bytesToTransmit
      }).then(response => response.text())
      .then(response => {
        document.getElementById('mainResponse').innerHTML += uartHelpers.responseDisplay(response);
      });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
  }
}

var uartDisplayer = function () {

  document.getElementById("mainContent").innerHTML = `
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Baud Rate Select
    </label>
    <select onChange="uartHelpers.changeValue(this.value, 'baudrate')" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" id="pinSelection">
      <option>9600</option>
      <option>38400</option>
      <option>115200</option>
    </select>
  </div>
  
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Data to send
    </label>
    <textarea class="resize border border-gray-800 rounded focus:outline-none focus:shadow-outline text-sm"></textarea>
  </div>

  <div id="addContent">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Number of bytes to receive
      </label>
      <input onChange="uartHelpers.changeValue(this.value, 'numOfBytesRcv')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberofbytesreceive" type="text" placeholder="0">
    </div>
  </div>
  
  <div id="addContent">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Receive Time Out
      </label>
      <input onChange="uartHelpers.changeValue(this.value, 'timeout')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="receivetimeout" type="text" placeholder="5">
    </div>
  </div>

  <div class="flex items-center justify-between">
    <button onClick="uartHelpers.submitClick(this)" class="m-auto align-middle bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline color" type="button">
      Set
    </button>
  </div>
  </form>
  `;
};

