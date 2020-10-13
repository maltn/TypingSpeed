$(document).ready(function(){
	$("#myCookieConsent").fadeIn(400);
	$("#cookieButton").click(function(){

		document.cookie = "CookieWarningClosed = true"
		console.log('Cookies message closed');
		$("#myCookieConsent").fadeOut(400);
	});
});