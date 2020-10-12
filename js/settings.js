function settingsBttn(){
	var settingsMenu = document.getElementById("settingsMenuWrapper")

	if(settingsMenu.style.display == "none" || settingsMenu.style.display == ""){
		settingsMenu.style.display = "block"
	}else{
		settingsMenu.style.display = "none"
	}
}