$(function () {
	// API Caller Utility Function
	var apiCaller = function (url, data, type = "GET") {
		return $.ajax({
			url: url,
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

	// Login Logic
	$('#loginForm').submit((e) => {
		e.preventDefault();
		var loginBtn = $('#loginBtn')
		loginBtn.addClass('fa fa-spin fa-spinner')

		apiCaller('/api/auth/login', {
			email: $('#loginEmail').val().trim(),
			password: $('#loginPass').val().trim(),
			remember: $('#remember').is(':checked')
		}, 'POST').done((res) => {
			loginBtn.html('Successful!')
			window.location.replace('/account')
		}).fail((xhr, status, err) => {
			$('#errorMsg').html('Incorrect Email or Password')
		}).always((xhr, status) => {
			loginBtn.removeClass('fa fa-spin fa-spinner')
		})
	})
})