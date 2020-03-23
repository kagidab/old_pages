let numInputs = 0;
let inputArray = [];

class Calculation {

  constructor(inputNumber){
    let inputs = document.getElementById("inputs")
    this.form = document.createElement("form");
    this.input = document.createElement("input");
    this.resultContainer = document.createElement("div");
    this.number = document.createElement("span");
    this.result = document.createElement("span");

    this.form.setAttribute("id", "calc" + inputNumber);
    this.input.setAttribute("id", "input-calc" + inputNumber);
    this.result.setAttribute("id", "result-calc" + inputNumber);

    this.resultContainer.setAttribute("class", "result");
    this.number.setAttribute("class", "result number");
    this.result.setAttribute("class", "result");

    this.number.innerHTML = "[" + inputNumber + "]";

    this.form.setAttribute("onsubmit", "return calculate('calc" + inputNumber + "')");
    this.resultContainer.setAttribute("onclick", "copy('result-calc" + inputNumber + "')");

    this.form.appendChild(this.input);
    this.form.appendChild(this.resultContainer);
    this.resultContainer.appendChild(this.number);
    this.resultContainer.appendChild(this.result);

    inputs.appendChild(this.form);
    window.scrollTo(0, document.body.scrollHeight);
  }
}


function newInput(){
  inputArray.push(new Calculation(numInputs++));
}

function test(input){
  let index = Number(input.substring(1, input.length-1))
  if(index < numInputs) return '(' + inputArray[index].result.innerHTML + ')';
  return "NULL";
}

function calculate(form) {
  let input = document.getElementById('input-' + form).value;
  let result = document.getElementById('result-' + form);

  fixed = input.replace(/\[[0-9]+\]/g, test)
  try {
    result.innerHTML = Algebrite.run(fixed);
  } catch(err) {
    result.innerHTML = err;
  }
  return false
} 

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function copy(id){
  let element = document.getElementById(id);
  copyToClipboard(element.innerHTML);
}

window.onload = function() {
  newInput()
}
