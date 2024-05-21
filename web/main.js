function uploadIMG() {
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