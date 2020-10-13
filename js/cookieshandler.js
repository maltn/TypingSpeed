function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
		if (c.indexOf(name) == 0) {
			var output = c.substring(name.length, c.length);
			if(output === "true" || output === "false"){
				output = (output === 'true');
			}
			return output;
		}
	}
	return "";
}

function CookieWarning(){
	if(getCookie("CookieWarningClosed")){

	}
	else{
		$("#myCookieConsent").fadeIn(400);
	}
	document.cookie = "consent = true"
}

$(document).ready(function(){
	CookieWarning()
	$("#cookieButton").click(function(){

		document.cookie = "CookieWarningClosed = true"
		console.log('Cookies message closed');
		$("#myCookieConsent").fadeOut(400);
	});
});