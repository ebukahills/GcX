$(function () {
	// API Caller Utility Function
	var apiCaller = function (url, data, type = "GET") {
		return $.ajax({
			url: '/api/' + url,
			data: data,
			type: type
		})
	}

	var modalOptions = {
		backdrop: 'static',
	}

	$('#login-link, #login-link-back').click(() => {
		$('#signup-modal').modal('hide');
		$('#login-modal').modal();
	});

	$('#signup-link').click(() => {
		$('#login-modal').modal('hide');
		$('#signup-modal').modal()
		$('#country').val('NG');
	});

	$('#forgot-link').click(() => {
		$('#login-modal').modal('hide')
		$('#forgot-modal').modal()
	})

	// Signup Logic
	$('#signupForm').submit((e) => {
		e.preventDefault()
		var signupBtn = $('#signupBtn')
		signupBtn.addClass('fa fa-spin fa-spinner')

		apiCaller('auth/signup', {
			username: $('#signupEmail').val().trim(),
			password: $('#password').val().trim(),
			name: $('#fullName').val().trim(),
			phone: $('#phoneNumber').val().toString(),
			country: $('#country').val()
		}, 'POST')
		.done((res) => {
			signupBtn.html('Successful!').fadeOut(2000)
			console.info(res)
			// window.location.replace('/account')
		})
		.fail((xhr, status, err) => $('#errorMsg').html('Error. Please Try Again'))
		.always((xhr, status) => signupBtn.removeClass('fa fa-spin fa-spinner'))
	})

	// Login Logic
	$('#loginForm').submit((e) => {
		e.preventDefault();
		var loginBtn = $('#loginBtn')
		loginBtn.addClass('fa fa-spin fa-spinner')

		apiCaller('auth/login', {
			username: $('#loginEmail').val().trim(),
			password: $('#loginPass').val().trim(),
			remember: $('#remember').is(':checked')
		}, 'POST')
		.done((res) => {
			loginBtn.html('Successful!').fadeOut(2000)
			console.info(res)
			// window.location.replace('/account')
		})
		.fail((xhr, status, err) => {
			$('#errorMsg').html('Incorrect Email or Password')
		})
		.always((xhr, status) => {
			loginBtn.removeClass('fa fa-spin fa-spinner')
		})
	})
})