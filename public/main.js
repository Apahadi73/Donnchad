function setFormMessage(formElement, type, message) {
	const messageElement = formElement.querySelector(".form__message");

	messageElement.textContent = message;
	messageElement.classList.remove(
		"form__message--success",
		"form__message--error"
	);
	messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
	inputElement.classList.add("form__input--error");
	inputElement.parentElement.querySelector(
		".form__input-error-message"
	).textContent = message;
}

function clearInputError(inputElement) {
	inputElement.classList.remove("form__input--error");
	inputElement.parentElement.querySelector(
		".form__input-error-message"
	).textContent = "";
}
document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.querySelector("#password_reset");

	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const p1 = document.getElementById("password").value;
		const p2 = document.getElementById("confirm_password").value;
		var query = window.location.pathname;
		const token = query.split("/")[4];

		if (p1 != p2) {
			setFormMessage(loginForm, "error", "Passwords don't match.");
		} else {
			fetch(`http://localhost:5002/api/users/reset-password/${token}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ password: p1 }),
			})
				.then((response) => response.json())
				.then((data) => {
					document.getElementById("headline").style.display = "none";
					document.getElementById("password").style.display = "none";
					document.getElementById("confirm_password").style.display =
						"none";
					document.getElementById("submit_btn").style.display =
						"none";
					setFormMessage(loginForm, "success", data);
				})
				.catch((e) =>
					setFormMessage(
						loginForm,
						"error",
						"Something went wrong. Please try again later."
					)
				);
		}
	});

	document.querySelectorAll(".form__input").forEach((inputElement) => {
		inputElement.addEventListener("blur", (e) => {
			if (
				(e.target.id === "password" ||
					e.target.id === "confirm_password") &&
				e.target.value.length >= 0 &&
				e.target.value.length < 6
			) {
				setInputError(
					inputElement,
					"Password must be at least 6 characters in length"
				);
			}
		});

		inputElement.addEventListener("input", (e) => {
			clearInputError(inputElement);
		});
	});
});
