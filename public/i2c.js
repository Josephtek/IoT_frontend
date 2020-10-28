const i2cFields = {
  rate: 100000,
  deviceAddress: undefined,
  bytesToTransmit: undefined,
  numberBytesToReceive: 0,
  timeout: 0
};

var i2cHelpers = {
  changeValue: function(selectObject, field) {

    if (field === 'rate') {
      i2cFields.rate = selectObject;
    } else if (field === 'deviceaddress') {
      i2cFields.deviceAddress = selectObject;
    } else if (field === 'datatransmit') {
      i2cFields.bytesToTransmit = selectObject
    } else if (field === 'numberreceive') {
      i2cFields.numberBytesToReceive = selectObject;
    } else if (field === 'timeout') {
      i2cFields.timeout = selectObject;
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
    let properties = this._objectWithoutProperties(i2cFields, 'bytesToTransmit');
    let request = 'i2cOperation' + '?' + jQuery.param(properties);
    try {
      const response = await fetch(request, {
        method: 'post',
        body: i2cFields.bytesToTransmit
      }).then(response => response.text())
      .then(response => {
        document.getElementById('mainResponse').innerHTML += i2cHelpers.responseDisplay(response);
      });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
  }
}

var i2cDisplayer = function () {

  document.getElementById("mainContent").innerHTML = `
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-5">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Rate in Hz
    </label>
    <input onChange="i2cHelpers.changeValue(this.value, 'rate')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rate" type="text" placeholder="0">
  </div>
  
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Device Address
    </label>
    <input onChange="i2cHelpers.changeValue(this.value, 'deviceaddress')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="0">
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Data to Send
    </label>
    <textarea onChange="i2cHelpers.changeValue(this.value, 'datatransmit')" class="resize border border-gray-800 rounded focus:outline-none focus:shadow-outline text-sm"></textarea>
  </div>
  
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Number of bytes to receive
    </label>
    <input onChange="i2cHelpers.changeValue(this.value, 'numberreceive')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberreceive" type="text" placeholder="5">
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Receive Time Out
    </label>
    <input onChange="i2cHelpers.changeValue(this.value, 'timeout')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="receivetimeout" type="text" placeholder="5">
  </div>

  <div class="flex items-center justify-between">
    <button onClick="i2cHelpers.submitClick(this)" class="m-auto align-middle bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline color" type="button">
      Set
    </button>
  </div>
  </form>
  `;
};

