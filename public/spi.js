const spiFields = {
  rate: 0,
  bytesToTransmit: undefined,
  numberBytesToReceive: 0,
  timeout: 0
};

var spiHelpers = {
  changeValue: function(selectObject, field) {

    if (field === 'rate') {
      spiFields.barateudRate = selectObject;
    } else if (field === 'bytestosend') {
      spiFields.bytesToTransmit = selectObject;
    } else if (field === 'numberbytesreceive') {
      spiFields.numberBytesToReceive = selectObject;
    } else if (field === 'timeout') {
      spiFields.timeout = selectObject;
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
    let properties = this._objectWithoutProperties(spiFields, 'bytesToTransmit');
    let request = 'spiOperation' + '?' + jQuery.param(properties);
    try {
      const response = await fetch(request, {
        method: 'post',
        body: spiFields.bytesToTransmit
      }).then(response => response.text())
      .then(response => {
        document.getElementById('mainResponse').innerHTML += spiHelpers.responseDisplay(response);
      });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
  }
}

var spiDisplayer = function () {

  document.getElementById("mainContent").innerHTML = `
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Rate in Hz
    </label>
    <input onChange="spiHelpers.changeValue(this.value, 'rate')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberofbytesreceive" type="text" placeholder="0">
  </div>
  
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Data to send
    </label>
    <textarea onChange="spiHelpers.changeValue(this.value, 'bytestosend')" class="resize border border-gray-800 rounded focus:outline-none focus:shadow-outline text-sm"></textarea>
  </div>

  <div id="addContent">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Number of bytes to receive
      </label>
      <input onChange="spiHelpers.changeValue(this.value, 'numOfBytesRcv')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberofbytesreceive" type="text" placeholder="0">
    </div>
  </div>
  
  <div id="addContent">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Receive Time Out
      </label>
      <input onChange="spiHelpers.changeValue(this.value, 'timeout')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="receivetimeout" type="text" placeholder="5">
    </div>
  </div>

  <div class="flex items-center justify-between">
    <button onClick="spiHelpers.submitClick(this)" class="m-auto align-middle bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline color" type="button">
      Set
    </button>
  </div>
  </form>
  `;
};

