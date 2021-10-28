// open and preview file
var openFile = function (file) {
	var input = file.target;

	var reader = new FileReader();
	reader.onload = function () {
		var dataURL = reader.result;
		var output = document.getElementById("output");
		output.src = dataURL;
	};
	reader.readAsDataURL(input.files[0]);
};

let uploadBtn = document.getElementById("submit_btn");
let image = document.getElementById("event_image");

// uploads image
uploadBtn.addEventListener("click", (event) => {
	event.preventDefault();
	const formData = new FormData();
	formData.append("imageFile", image.files[0]);
	fetch(`http://localhost:5002/api/user/1/image`, {
		method: "POST",
		body: formData,
	})
		.then((response) => console.log(response))
		.catch((e) => console.log(e));
});
