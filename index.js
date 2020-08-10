Mercadopago.setPublishableKey('TEST-103c3862-74e5-4276-b6cf-65ece7878735');

//Access token: TEST-1642624256087526-040316-1ad265048e8c72865eb8922151d6ca39-422839157

function getBin() {
  var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
  return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
}

function setPaymentMethodInfo(status, response) {
  if (status == 200) {
    var paymentMethod = document.getElementById('paymentMethod');

    paymentMethod.setAttribute('name', 'paymentMethodId');
    paymentMethod.setAttribute('type', 'hidden');

    paymentMethod.setAttribute('value', response[0].id);
    var form = document.querySelector('#pay');
    form.appendChild(paymentMethod);
  } else {
    document.querySelector('input[name=paymentMethodId]').value =
      response[0].id;
  }
}

function sdkResponseHandler(status, response) {
  window.Mercadopago.clearSession();
  if (status != 200 && status != 201) {
    alert(status);
  } else {
    var form = document.querySelector('#pay');
    var card = document.createElement('input');
    card.setAttribute('name', 'token');
    card.setAttribute('type', 'hidden');
    card.setAttribute('value', response.id);
    form.appendChild(card);
    alert('generated card token: ' + response.id);
    // form.submit();
  }
}

function pagar() {
  var form = document.querySelector('#pay');

  Mercadopago.getPaymentMethod(
    {
      bin: getBin(),
    },
    setPaymentMethodInfo,
  );

  Mercadopago.createToken(form, sdkResponseHandler);
}
