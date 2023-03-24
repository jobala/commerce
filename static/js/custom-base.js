function getQueryParams() {
	var locationSearch = document.location.search;
	let qd = {};
	if (locationSearch) locationSearch.substr(1).split("&").forEach(function(item) {
		let s = item.split("="),
			k = s[0],
			v = s[1] && decodeURIComponent(s[1]);
		qd[k] = v;  // No multi-value support; just use the last one.
	});
	return qd;
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Checks for UTM parameters, stores them in a cookie. Basically last-click
// attribution for paid accounts only, we don't check referrers or such.
var CW_UTMS_COOKIE_NAME = '__cw_utms';
function getSetUtms() {
	cookie = readCookie(CW_UTMS_COOKIE_NAME);
	var medium = '';
	var source = '';
	var campaign = '';
	var coupon = '';
	if (cookie) {
		var parts = cookie.split('|');
		medium = parts[0];
		source = parts[1];
		campaign = parts[2];
		if (parts.length > 3)
			coupon = parts[3];
	}
	params = getQueryParams();
	params_medium = params['utm_medium'];
	params_source = params['utm_source'];
	params_campaign = params['utm_campaign'];
	params_coupon = params['signup_coupon'];
	if (params_medium) {
		medium = params_medium;
	}
	if (params_source) {
		source = params_source;
	}
	if (params_campaign) {
		campaign = params_campaign;
	}
	if (params_coupon) {
		coupon = params_coupon;
	}
	cookie = medium + '|' + source + '|' + campaign + '|' + coupon;
	createCookie(CW_UTMS_COOKIE_NAME, cookie, 30);
	return cookie;
}

function determinePartnerStack(cookie, params) {
	var gspk = '';
	var gsxid = '';
	if (cookie) {
		var parts = cookie.split('|');
		gspk = parts[0];
		gsxid = parts[1];
	}
	params_gspk = params['gspk'];
	params_gsxid = params['gsxid'];
	if (params_gspk) {
		gspk = params_gspk;
	}
	if (params_gsxid) {
		gsxid = params_gsxid;
	}
	cookie = gspk + '|' + gsxid;
	if (gspk != '' || gsxid != '') {
		return {
			cookie: cookie,
			params: {
				gspk: gspk,
				gsxid: gsxid
			}
		};
	} else {
		return {cookie: cookie, params: null};
	}
}

function addPartnerStackParams(url, params) {
	if (params) {
		var gspk = params.gspk || '';
		var gsxid = params.gsxid || '';
		return url + "&gspk=" + encodeURIComponent(gspk) + "&gsxid=" + encodeURIComponent(gsxid);
	} else {
		return url;
	}
}

// Checks for PartnerStack parameters, stores them in a cookie. Last-referral attribution.
var CW_PARTNERSTACK_COOKIE_NAME = '__cw_partnerstack';
function getSetPartnerStack() {
	cookie = readCookie(CW_PARTNERSTACK_COOKIE_NAME);
	queryParams = getQueryParams();
	result = determinePartnerStack(cookie, queryParams);
	createCookie(CW_PARTNERSTACK_COOKIE_NAME, result.cookie, 30);
	return result.params;
}

// If the current browser is Internet Explorer, return its version number, otherwise
// return false.
function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	// other browser
	return false;
}

function shouldIncludeGrowsumoCode() {
	return detectIE() == false;
}

function createSignupLink() {
		var reff = getSetUtms();
		var partnerStackParams = getSetPartnerStack();

		var url = 'https://meeting.is/ss/signup?reff=';
		if (partnerStackParams && (!reff || reff == 'unset' || reff == '|||')) {
			var gspk = partnerStackParams.gspk || '';
			try {
				gspk = atob(gspk);
			} catch (_) {
				// Nothing to do, just leave gspk as is
			}
			var gsxid = partnerStackParams.gsxid || '';
			reff = 'partnerstack|' + gspk + '|' + gsxid + '|';
		}
		if (!reff)
			reff = 'unset';
		url += encodeURIComponent(reff);
		if (reff.indexOf('|webcom') != -1 || reff.indexOf('|netsol') != -1 || reff.indexOf('|register') != -1) {
			url += "&rp=webcom_cw_free";
		} else if (reff.indexOf('|nikojuntunen_trial') != -1) {
			url += "&rp=nikojuntunen_trial";
		}

		url = addPartnerStackParams(url, partnerStackParams);
		url = url + '#email';
		return url;
}