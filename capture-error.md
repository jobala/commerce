---
layout: plain
title: "Capture Error"
description: "There was an error attempting to capture your screen. Here are further details and troubleshooting notes."
---

# Capture Error!

Unfortunately, CrankWheel received an error from your computer's operating system or your browser, when trying to access a video stream of your screen or application window for screen sharing.

Error details:
   * Name: <span id="errorname">unset</span>
   * Message: <span id="errormessage">unset</span>

<p>
We have a video showing the steps you need to take to resolve the issue. Please <a href="https://www.loom.com/share/4485a511329743e2871807c5364d8d26">&gt;&gt;click here&lt;&lt;</a> to watch the video and follow the steps.
</p>
<p>
Some users have reported needing to restart their computer after following the steps in the video.
</p>
<p>
For a few users, the following additional steps resolved the issue, you should try this last. Here they are in <a href="https://www.loom.com/share/d414abd91132424cacc27b202594dc81">&gt;&gt; video form &lt;&lt;</a> or if you prefer, here they are written down:

<ol>
<li>Hit ⌘-Space to bring up the Spotlight search bar, and type in System Preferences, then hit Enter</li>
<li>Double-click on Security & Privacy</li>
<li>Select 'Privacy' at the top</li>
<li>Find and select 'Screen Recording' in the left-hand-side list</li>
<li>At this point, if the lock icon in the bottom-right of the dialog box is closed, you need to click it and provide your password to unlock it. Same goes at later steps, if the lock is closed, you need to open it.</li>
<li>Uncheck Google Chrome in right-hand-side list</li>
<li>Choose Quit & Reopen, wait for Chrome to open</li>
<li>Click on the text “Google Chrome” in the same S&P dialog</li>
<li>Click the minus sign below the box, this removes Google Chrome from the list</li>
<li>Try to screen share with Chrome, and when prompted, choose “Open System Preferences”</li>
<li>Put a checkmark next to Google Chrome</li>
<li>Choose Quit & Reopen</li>
<li>Screenshare again and you should be good</li>
</ol>
</p>

<p>
If that does not resolve the issue, please check <a href="https://crankwheel.zendesk.com/hc/en-us/articles/360009929339-macOS-Catalina-Can-t-share-full-screen-or-application-window">this article in our support center</a>.
</p>

<script>
$(document).ready(function () {
	var queryString = {};
	location.search.substr(1).split("&").forEach(function (pair) {
		if (pair === "") return;
		var parts = pair.split("=");
		queryString[parts[0]] = parts[1] &&
			decodeURIComponent(parts[1].replace(/\+/g, " "));
	});

	var errorName = queryString.name;
	$('#errorname').text(errorName);
	$('#errormessage').text(queryString.message);
});
</script>
