function fibonacci(n) {
  if (n == 0) {
    return 0;
  } else {
    if (n == 1) {
      return 1;
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }
}


function btnFibonacci() {
  document.getElementById('spinner').classList.add('d-none');
  document.getElementById('error-msg').classList.add('d-none');
  document.getElementById('42-error').classList.add('d-none');
  document.formFibonacci.fibonacciResult.value = '';
  var n = Number(document.formFibonacci.textNumber.value);

  if (!n) return;

  if (n != 42 && n > 50) {
    document.getElementById('textNumber').classList.add('error');
    document.getElementById('error-msg').classList.remove('d-none');
    return;
  } else document.getElementById('textNumber').classList.remove('error');


  document.getElementById('spinner').classList.remove('d-none');



  setTimeout(() => {

    if (n == 42) {
      document.getElementById('42-error').classList.remove('d-none');
    } else {
      if (document.formFibonacci.saveCalc.checked) {
        result.push({
          input: n,
          output: fibonacci(n),
          date: new Date().toUTCString(),
        });
        localStorage.setItem('result', JSON.stringify(result));
      }
      document.formFibonacci.fibonacciResult.value = fibonacci(n);
    }

    document.getElementById('spinner').classList.add('d-none');
  }, 2000);



  let result = JSON.parse(localStorage.getItem('result')) || [];


  async function getServer(url) {
    try {

      console.log('Server with num = ', 'http://localhost:5050/fibonacci/' + n);
      const response = await fetch('http://localhost:5050/fibonacci/' + n);
      console.log('response in try', response);

      if (response.status == '400') {
        const result = await response.text();
        console.log('result form get data:', result);
        return result;
      } else {
        const result = await response.json();
        console.log('result from get data:', result.result);
        return result.result;
      }
    } catch (err) {
      console.log('error fetching data:', result);
    }
  };

  getServer();



  async function getResultServer(url) {
    try {
      fetch('http://serveur.net', { method: 'POST', body: { n: n } });
    } catch (error) {
      console.log(error);
    }
  };








  document.getElementById('sort').onchange = e => {
    switch (e.target.value) {
      case 'number-asc':
        result.sort((a, b) => a.input - b.input);
        break;

      case 'number-desc':
        result.sort((a, b) => b.input - a.input);
        break;

      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;

      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

      default:
        break;
    }


    document.getElementById('list-result').innerHTML = '';
    for (const item of result) {
      document.getElementById(
        'list-result',
      ).innerHTML += 
      `<li>The Fibonnaci Of <strong>${item.input}</strong> is <strong>${item.output}</strong> at: ${item.date}</li>`;
    }
  };

}