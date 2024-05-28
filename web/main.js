
let model;
var iteracoes = 0;

async function loadModel() {
  try {
    model = await tf.loadLayersModel('../notebooks/models/tfjs_model/model.json')
    //document.getElementById('result').innerText = 'Model loaded'
  } catch (error) {
    console.error('Error loading model:', error)
    //alert('Error loading model')
  }
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => resolve(img);
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function callAI() {
  document.getElementById('container1').hidden = true
  document.getElementById('container2').hidden = false

  const input = document.getElementById('inputImage');
  if (input.files.length === 0) {
    //alert('Please select an image file first.');
    return;
  }

  const file = input.files[0];
  let img;
  try {
    img = await readImage(file);
    //alert("Image read successfully");
  } catch (error) {
    console.error('Error reading image:', error);
    //alert('Error reading image');
    return;
  }

  try {
    const tensor = tf.browser.fromPixels(img)
      .resizeNearestNeighbor([32, 32])  // Ajuste o tamanho conforme necessário
      .toFloat()
      .expandDims();
    //alert("Image converted to tensor");

    const prediction = await model.predict(tensor).data();
    const predictedClass = Array.from(prediction).indexOf(Math.max(...prediction));


    //fazer array para as probabilidades
    const predictionArray = prediction;
    const probabilitiesArray = Array.from(predictionArray);

    var xValues = ["Airplane", "Automobile", "Bird", "Cat", "Deer", "Dog", "Frog", "Horse", "Ship", "Truck"];
    var yValues = probabilitiesArray;
    var barColors = ["#92a8d1", "#034f84", "#f7cac9", "#f7786b", "#d5f4e6", "#80ced6", "#fefbd8", "#618685", "#f4a688", "#e0876a"];

    if (iteracoes > 0) {
      iteracoes += 1;
      
      var container = document.getElementById("container2");
      container.innerHTML = `
                <h3 id="h3myChart" style="text-align: center;"> 
                    <i class="bi bi-bar-chart"></i> Statistics
                </h3>
                <canvas id="myChart" style="border-radius: 10px; border:0;" width="100%" height="50px"></canvas>
            `;
      
      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: "Class Probability"
          }
        }
      });
    }
    else {
      iteracoes += 1;

      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: "Class Probability"
          }
        }
      });
    }

    var elements = document.getElementsByClassName('chartjs-hidden-iframe');
    // Itera sobre a coleção de elementos e define o estilo display para 'none'
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }

    //alert(xValues[predictedClass])
    document.getElementById('result').innerText = `Predicted class: ${xValues[predictedClass]}`;
    //alert(`Predicted class: ${predictedClass}`);
  } catch (error) {
    console.error('Error during prediction:', error);
    //alert('Error during prediction');
  }
}

loadModel();


function uploadIMG() {

  document.getElementById('container1').hidden = false
  document.getElementById('container2').hidden = true

  var input = document.getElementById("inputImage");
  var iframe = document.getElementById('imgFrame');
  var file = input.files[0];

  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      iframe.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please select a valid image file.");
  }
}
