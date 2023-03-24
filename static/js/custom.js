var EXTENSION_URL = 'https://chrome.google.com/webstore/detail/dooinopjfnhlmmdkdepajfipfhlcmjgp';

/**
* Function that tracks a click on an outbound link in Analytics.
* This function takes a valid URL string as an argument, and uses that URL string
* as the event label. Setting the transport method to 'beacon' lets the hit be sent
* using 'navigator.sendBeacon' in browser that support it.
*
* Use similarly to as follows:
* <a href="http://www.example.com" onclick="return gaTrackOutboundLink('http://www.example.com');">Check out example.com</a>
*/
var gaTrackOutboundLink = function(url) {
	return gaTrackOutboundLinkCb(url, function () { document.location = url; });
};

var gaTrackOutboundLinkCb = function(url, callback) {
	ga('send', 'event', 'outbound', 'click', url, {
		'transport': 'beacon',
		'hitCallback': callback
	});
	return false;
}

function handleInstall(event) {
    event.preventDefault();
    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        window.location.href = EXTENSION_URL;
    } else if (window.location.pathname === '/install/') {
        window.location.href = 'https://meeting.is/ss/signup?flow=finished';
    } else {
        gaTrackOutboundLink('https://meeting.is/ss/signup#email');
    }
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function doSignupLink() {
	return gaTrackOutboundLinkCb('https://meeting.is/ss/signup#email', function() {
		document.location = createSignupLink();
	});
}

(function(){
	window.addEventListener('DOMContentLoaded', function(event){
		getSetUtms();
		getSetPartnerStack();

		var body = document.querySelector('body');
		body.setAttribute('href','#top');

		var setupHandleInstall = function() {
            // All buttons with this style manually added.
            document.querySelectorAll("[href='" + EXTENSION_URL + "']")
				.forEach(function(link){
					link.addEventListener('click', handleInstall);
				});
        };
        setupHandleInstall();

        // // Dirty hack to set this handler on stuff added to DOM at page load
        // // time by AVIA theme.
        // window.setTimeout(setupHandleInstall, 300);
	});
})();

(function(){
	window.addEventListener('DOMContentLoaded', function(event){
		document
		.querySelectorAll('[href="https://meeting.is/ss/signup#email"]')
		.forEach(function(meetingis_link){
			meetingis_link.addEventListener('click', function(event){
				doSignupLink();
			});
		});
	});
})();