window.onload=function(){
    var boilerKeyLogo = document.getElementById("boilerKeyLogo");
    boilerKeyLogo.innerHTML = "<button title=\"Bypass BoilerKey\" style=\" font-size: 120%; width: 150px; background: none #FFFFFF; border: 1px solid #999999; color: #333333; padding: .15em; cursor: pointer; font-weight: bold;\">Autofill &amp; Login</button>";
    boilerKeyLogo.style = "margin-top: 5px !important;";
    function processForm(e) {
        e.preventDefault();
        chrome.storage.sync.get(["counter", "alias", "pin", "key"], function(result) {
            if(result.key && result.counter && result.alias && result.pin){
                otp = hotp(result.key, result.counter);
                document.getElementById("username").value = result.alias;
                document.getElementById("password").value = result.pin + "," + otp;
                chrome.storage.sync.set({"counter": parseInt(result.counter) + 1});
                document.getElementsByName("submit")[0].click();
            }else{
                alert("Please complete auto login setup before continuing.");
            }
        });
        return false;
    }

    boilerKeyLogo.addEventListener("click", processForm);
}