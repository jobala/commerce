---
layout: post
title: "Integrating with Google Analytics"
description: "Using the CrankWheel JavaScript API to integrate with Google Analytics."
thumbnail: "/static/images/pages/terms-of-service/logo.png"
date: 2018-06-24 11:00:00 +0000
author: CrankWheel
comments: true
---

This brief guide shows how to integrate events from Instant Demos into Google
Analytics. A similar approach can be used for other analytics systems.

## Setup on your website

In the footer of any page containing an Instant Demos button, you would have a few JavaScript snippets. First comes the Instant Demos snippet, then the Google Analytics snippet, and right below the GA snippet we define how we hook the Instant Demos events up to GA events.

Note that the event label "unbounce" below is just an example, we happened to be using Unbounce to build some landing apges at the time this example was created. You can use any label you want.

Also note that you need to fill in your unique Google Analytics code, where it says <pre>UA-XXXXXXX</pre> below.

<pre>
// This part is the standard Google Analytics snippet which you probably
// already have on your site. It is included here for context to show where
// the rest of the stuff goes.
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// This part has your unique code which usually starts with UA- and then has
// some digits.
ga('create', 'UA-XXXXXXX', 'auto');

// This is the standard event sent to Google Analytics, telling it the current
// page has been shown.
ga('send', 'pageview');

// The following lines show examples of hooking several events from
// Instant Demos, and sending events to Google Analytics when they are received.

// This one sends an event named "demoRequest" to Google Analytics, with an
// action of "Open" and a further explanation of "unbounce" (that's the name
// of the system we use for that particular landing page). This event is
// triggered when the Instant Demos lightbox gets opened, i.e. when the user
// clicks a "Get an Instant Demo" button.
showu.onEvent('open', function (){
    ga('send', 'event', 'demoRequest', 'Open', 'unbounce', 1);
});

// This one is similar but sends an action of "Click". It is sent when the
// user actually submits their phone number using the Instant Demos lead
// capture dialog.
showu.onEvent('requestDemo', function () {
    ga('send', 'event', 'demoRequest', 'Click', 'unbounce', 1);
});

// This last example listens for a specific optional field being filled in.
showu.onEvent('submitInfo', function (params) {
    if (params.id == 'email' && params.value != '') {
        ga('send', 'event', 'demoRequest', 'Email', 'unbounce', 1);
    }
});
</pre>

For full details on all of the events you can hook, see the JavaScript API
section of our [API documentation](/api/).

## Setup in Google Analytics

Once the above is set up, you can create goals in Google Analytics for each of
the events, or a funnel watching for the different events.

Here is an example of creating a goal for the click event (the one we send in
response to the <code>requestDemo</code> event from Instant Demos, in the
example above):

![Example of Google Analytics goal setup](/static/images/ga-example.png){:class="aligncenter"}
