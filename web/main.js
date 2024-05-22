function uploadIMG() {

    document.getElementById('container1').hidden = false
    document.getElementById('container2').hidden = true

    var input = document.getElementById("inputImage");
    var iframe = document.getElementById('imgFrame');
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            iframe.setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid image file.");
    }
}

function callAI() {

    document.getElementById('container1').hidden = true
    document.getElementById('container2').hidden = false

    var xValues = ["Airplane", "Automobile", "Bird", "Cat", "Deer", "Dog", "Frog", "Horse", "Ship", "Truck"];
    var yValues = [.3,.4,.6,.8,1,.3,.2,.2,.3,.4];
    var barColors = ["#92a8d1", "#034f84","#f7cac9","#f7786b","#d5f4e6","#80ced6","#fefbd8","#618685","#f4a688","#e0876a"];
    
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
        legend: {display: true},
        title: {
          display: true,
          text: "Class Probability"
        }
      }
    });
}