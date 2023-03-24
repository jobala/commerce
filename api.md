---
layout: plain
title: "CrankWheel API Documentation"
description: "Documentation for the various CrankWheel APIs."
thumbnail: "/static/images/pages/terms-of-service/logo.png"
sidebar: true
---

# CrankWheel API Documentation

Welcome to CrankWheel's API documentation. We have several APIs that
you can use, the main ones being:
1. Our RESTful API, for retrieving usage information.
2. Our JavaScript API for Instant Demos, where you can access advanced
functionality of Instant Demos.
3. Our URL-based email campaign API.
4. Our reseller RESTful API, for partners.

## RESTful API

Our RESTful API is available to all customers, just go to the API tab in
our [self-service dashboard](https://meeting.is/ss) to create an API key.

We use a system called Postman to document our RESTful API, as it lets our
customers easily test the API without writing any code.

[Access the documentation here](https://documenter.getpostman.com/view/1953706/crankwheel-restful-api/713cbLC).

Note that for many purposes, you can use our Zapier integration to take new demo request or screen sharing session information and use it to trigger actions on other systems. For example, you can use Zapier to get lead capture information into your CRM. The Zapier integration is available on all plans, and you can enable it via the API tab on your [self-service dashboard](https://meeting.is/ss).

Also note that on our enterprise plan we offer direct Salesforce integration, and we are open to adding direct integrations for other CRM systems. Contact [support@crankwheel.com](mailto:support@crankwheel.com) if you would like to discuss this.

## JavaScript API

Our JavaScript API may be used on any page where you have embedded your
Instant Demos JavaScript snippet. To retrieve this snippet, [log in](https://meeting.is/ss)
to the CrankWheel self-service dashboard as an administrator ([sign up](https://meeting.is/ss/signup#email) first if needed),
then visit the Instant Demos tab of the dashboard and retrieve the snippet. You
may need to enable Instant Demos before seeing the snippet. Contact
[support@crankwheel.com](mailto:support@crankwheel.com) if you need any asssistance
with this process.

Note that if you installed your CrankWheel JavaScript snippet before September 25th 2017,
your snippet may be missing some of the functionality described below. You can always switch
out your existing snippet for the latest snippet, which you can retrieve as explained above.

The JavaScript API is best explained by example, please see the code examples and comments below.

#### Launching the Instant Demos lead capture

Normally, you would attach the Instant Demos lead capture to any button or
clickable element by either setting the CSS style <code>crankwheel-com-showu-launch-button</code>
on the element, or if it has a <code>href</code> attribute, setting the <code>href</code> to
the URL <code>#crankwheel-com-showu-launch-button</code> or any URL that ends with this
hash value, such as <code>https://meeting.is/ss/showu/YOURCOMPANYSHORTNAME#crankwheel-com-showu-launch-button</code>

Another way to show the Instant Demos lead capture dialog is programmatically:

<pre>
// Launch the Instant Demos lead capture (note: you should wait until after the
// document is fully loaded to do this).
showu.launch();
</pre>

#### Responding to Instant Demos events

There are several events sent by Instant Demos at the moment:

1. <code>open</code> happens when the lead capture dialog opens up

2. <code>requestDemo</code> is triggered when your prospect submits their phone number

3. <code>submitInfo</code> happens each time the prospect submits an answer to an optional question (or clicks Next without entering any information) and contains an additional parameter with the ID (as per the Instant Demos question editor) and value of the question, with the value an empty string if the prospect did not fill in any information.

4. <code>submitLast</code> happens once the prospect has clicked 'Next' on all optional questions and sees the screen where they are given an overview of their submitted details.

5. <code>agentFound</code> happens when an agent has clicked "Handle request" for this demo request.

6. <code>callUnderway</code> happens when the handling agent has clicked "Call confirmed" for this demo request.

7. <code>noAnswer</code> happens if the handling agent clicks "No answer" for this demo request, to indicate that they tried to call but did not get through to the prospect.

8. <code>screenshareStarting</code> happens if the handling agent starts sharing their screen to the prospect while the prospect is still on the web page where they initiated the demo request. Note that this is sent right before the browser navigates to a different page, so you need to take action immediately within the event handler (e.g. storing an item in local storage, or doing so indirectly by logging an event via Google Analytics) as there will likely not be time to make any network requests or perform any deferred processing.

Note that if a prospect decides to edit any of their submitted information, or clicks back to go back to a previous question, you may see <code>submitInfo</code> arriving in a different order than you expected, and it's possible to receive <code>submitLast</code> more than once since the prospect may arrive at that screen and click the edit button to go through all the questions again.

Here is a simple example of listening to these events:

<pre>
showu.onEvent('open', function () {
    console.log("instant demo opened");
});

showu.onEvent('requestDemo', function () {
    console.log("demo requested");
});

showu.onEvent('submitInfo', function (params) {
    console.log("optional info submitted, ID=" + params.id + ", value=" + params.value);
});

showu.onEvent('submitLast', function () {
    console.log("all info fields submitted");
});

showu.onEvent('agentFound', function () {
    console.log("agent has committed to handling");
});

showu.onEvent('callUnderway', function () {
    console.log("phone call has started")
});

showu.onEvent('noAnswer', function () {
    console.log("agent indicated there was no answer");
});

showu.onEvent('screenshareStarting', function () {
    console.log("screen share starting");
});
</pre>

The JavaScript events documented above can, for example, be used to integrate events from
Instant Demos with usage analytics systems. We have a [quick guide](/google-analytics-integration/)
on how to accomplish this for Google Analytics.

#### Knowing the agent capacity

CrankWheel automatically determines how many agents are available based on
whether they have recently been active on their computer, and whether they are
already doing a screen share using CrankWheel. It then determines what the service
capacity of your sales team is: <code>full_capacity</code> (50% or more of
your team seems to be available), <code>half_capacity</code> (less than
half your team seems to be available)
or <code>no_capacity</code> (nobody is available). You might wish to use these values, for example
to change the text on a button to reflect the expectation you want to set, e.g.
make it say "Get an Instant Demo" when there are agents available, and "Book a Demo"
when there aren't. In its lead capture dialog, CrankWheel uses the service capacity
to determine which set of messaging and which behavior to use, and you
can configure messaging based on behavior in the Instant Demos configuration, which
you can access through the [self-service dashboard](https://meeting.is/ss)
(click Instant Demos, then the button to Configure).

<pre>
// This will log on of "full_capacity", "half_capacity" or "no_capacity"
showu.getCapacity(function (cap) { console.log(cap); });
</pre>

#### Pre-populating known fields

If you already know the answer to one of the questions you normally ask your
prospects during lead capture, for example if they are already logged into
your web page so you know their name and email, you can pass this information
along to the Instant Demos lead capture dialog so that it doesn't ask the
questions matching the information.

The key for each item is identical to the ID parameter that you will see when
you edit the lead capture questions in the Instant Demos interactive editor
(access it through the [self-service dashboard](https://meeting.is/ss)).

Call this API any time before the lead capture dialog is opened to prepopulate.

<pre>
showu.populateFields({
    name: 'Joi',
    email: 'joi@crankwheel.com'
});
</pre>

You may also pre-populate arbitrary information into the lead capture to have
it transferred through the lead capture process so that it ends up in emails
with lead capture information, or in your CRM or via our API. For example if
this prospect has created an account in your system you may want to transfer
the account ID along with the other information you already know:

<pre>
showu.populateFields({
    email: 'somebody@example.com',
    accountid: '9114354'
});
</pre>

On the other end, the account ID in the example above would show up as
<code>prospect-accountid</code> in the prospect information that you can
retrieve via the RESTful API, or via Zapier.

Note that standard UTM parameters typically used to track marketing efforts
(<code>utm_source</code>, <code>utm_medium</code> and so forth) are automatically
pre-populated as arbitrary information for any demo request.

## Email campaign API

In email campaigns, you can link to a URL that looks like this to launch
the Instant Demos lead capture when the link is clicked:

<pre>
https://meeting.is/ss/showu/YOURCOMPANYSHORTNAME
</pre>

Replace YOURCOMPANYSHORTNAME with the short name you chose for your company. You
can see it by logging into the [self-service dashboard](https://meeting.is/ss) as
an administrator and going to Edit company, or if you open the main CrankWheel UI
it is shown at the bottom of the UI.

If you wish to pre-populate fields, you may do so using query parameters matching
the ID of the field. When you send an email, you typically know the prospects
email address, and so will typically want to pre-populate it. Let's also imagine
you already know their name. Here's how you would pre-populate that:

<pre>
https://meeting.is/ss/showu/YOURCOMPANYSHORTNAME?email=joi@crankwheel.com&name=Joi
</pre>

### URL command API

If you need to cause the CrankWheel presenter UI to appear (as if the presenter
had clicked the CrankWheel button), this can be opening a fresh browser tab to 
a "magic" URL.

#### Magic URL

This simple approach opens a web page that will cause the CrankWheel UI to
show and then close the tab of the web page, or if CrankWheel is not already
installed, it will show instructions for how to install it.

Simply open a new browser tab to this URL:

<pre>
http://crankwheel.com/install/#crankwheelmagicshowui:mainandclose
</pre>

Or, in HTML, using an anchor as follows:

<pre>
&lt;a href="http://crankwheel.com/install/#crankwheelmagicshowui:mainandclose" target="_blank"&gt;Launch CrankWheel&lt;/a&gt;
</pre>

Or, using JavaScript:

<pre>
window.open('http://crankwheel.com/install/#crankwheelmagicshowui:mainandclose', '_blank');
</pre>

#### Setting parameters

Using the URL command, you can pass several parameters in URLs by using the <strong>:extraparams:</strong> syntax:

<pre>
http://crankwheel.com/install/#crankwheelmagicshowui:mainandclose:extraparams:emailaddress=...&countrycode=...&phonenumber=...
</pre>

Each of the parameter fields should be URL-encoded. They are used to pre-populate the fields shown after you start screen sharing and want to send somebody a link. They are:
* <strong>emailaddress</strong>: Your contact's email address.
* <strong>countrycode</strong>: The country code of your contact's phone number. If you leave this unset, CrankWheel tries to determine your location in the world and use your country's country code, by default.
* <strong>phonenumber</strong>: Your contact's phone number, not including country code.

You can set any or all of the fields when specifying <strong>:extraparams:</strong>.

## Webhook API

We have a webhook API that sends a webhook for every event occurring during an Instant Demos lead capture and handling of the prospect via the Instant Demos mechanism. This API is currently experimental and subject to change. Contact [support@crankwheel.com](mailto:support@crankwheel.com) if you would like to explore use of the webhook API.

## Embedding API

All parts of CrankWheel's viewer experience can be embedded in an iframe. When this is done, there are a couple of postMessage events
that the CrankWheel viewer interface will send to the parent frame during the screen sharing session, [all demonstrated in this jsfiddle](https://jsfiddle.net/joisig/xvok9w0b/11/).

## Browser tab sharing API

CrankWheel provides a couple of ways that web pages can interact with CrankWheel's "browser tab" screen sharing mode by reading or writing attributes of the page's DOM.

### Cropping hints

For certain use cases, you may want to share only part of a web page that is shared using CrankWheel's "browser tab" mode of sharing.

Web pages can provide specifications to CrankWheel of an amount of additional crop to apply along the left, right, top and bottom edges of the browser tab, specified in the same dimension as window.innerWidth and window.innerHeight use, effectively logical pixels.

Here's how to do it:

1. Add the className `crankwheel-extra-crop-data` to an element on the page (CrankWheel will use the first it finds if there are multiple). The element should exist and have this class from DOM load or at least before browser tab sharing starts, and you should not remove the class from the element to add it to a different element during the lifetime of the document.

2. On that element, any or all of the following attributes can be added, each of which has an integer value: `data-crankwheel-crop-top`, `data-crankwheel-crop-right`, `data-crankwheel-crop-bottom` and `data-crankwheel-crop-left`.

3. The integer values of those data items are used to control cropping, from the top/right/bottom/left edges. The units of the values are the same as the units of `window.innerWidth` and `window.innerHeight`.

4. CrankWheel will monitor those data values for changes and update the cropping area when they are changed. Any value that is omitted is treated as if it had been set to 0, i.e. no cropping on that side.

Cropping applies to the current page only and will reset as soon as the page is navigated or a different browser tab is shared. Cropping is never applied when sharing full screen or application window. You can try out the cropping feature by [visiting this page](/crop-hint-tester) and screen sharing it using CrankWheel's browser tab mode. You can also view that page's source to see a simple implementation of how on-page hints are provided. That page allows specifying crops as absolute pixel values, but a more typical use case would be to select a given element of the page, determine its placement in pixels away from the left, right, top and bottom edges of the viewport, and adjust the crop based on that to show just the given element and its contents.

### Detect when current tab is shared

When a browser tab is being shared, the document loaded in that browser tab can detect whether or not CrankWheel is currently sharing it. Note that this is true only for the "browser tab" mode of screen sharing in CrankWheel, and the web page will not be able to detect whether full screen or application window screen sharing is ongoing.

Here's how:

1. Add the className `crankwheel-screen-sharing-indicator` to an element on the page (CrankWheel will use the first one it finds, if any).

2. When screen sharing starts for that particular browser tab, CrankWheel will set the `data-crankwheel-is-sharing-this-tab` attribute on the first such element to the string `"true"`. When screen sharing is ended or changed to share a different browser tab or full screen or an application window (i.e. the current tab is no longer being shared), CrankWheel will set that attribute to the string `"false"`.

Note that non-existence of the attribute should be interpreted the same as a value of `"false"` i.e. the tab is not being screen shared.

Also note that the attribute will be set to `"true"` as soon as a tab is selected for screen sharing, even if no viewers are currently connected to the screen sharing session.

You can see this functionality in action by [visiting this page](/crop-hint-tester) and screen sharing it using CrankWheel's browser tab mode. You can also view that page's source to see an example implementation of observing changes of the attribute using a `MutationObserver`.

## Reseller API

Our reseller API is available to resellers and other partners only. It is primarily a RESTful API [documented here](https://documenter.getpostman.com/view/1953706/S11Lscu6).

In addition to the RESTful API for integration partners, the WYSIWYG editor for Instant Demos is embeddable into their applications using URL parameters to provide URLs linking back to the reseller partner's dashboard. An example that links back to example.com for the dashboard and example.com/instructions for the instructions button would be:

<pre>
https://meeting.is/ss/instant_demo/configure?dashboard_url=http://example.com&instructions_url=http://example.com/instructions
</pre>

An URL like the above would typically be used in conjunction with an SSO URL generated by the ["Grant token" API](https://documenter.getpostman.com/view/1953706/S11Lscu6#349ee428-dfaf-4085-a9d5-b7f1bcb59e58) with the `dest_url` parameter included and set to `/ss/instant_demo/configure` (plus parameters such as above).

## Integration guides for specific scenarios

We have a small collection of integration guides for specific scenarios:
* [Integrate events from Instant Demos with Google Analytics](/google-analytics-integration/)
* [Use SSO for your employees](/enterprise-sso-integration/)
* [Set up a custom URL for your enterprise](/enterprise-custom-url/)
* [Set up a custom URL when your site is hosted using WordPress](/enterprise-custom-url-wordpress/)
* [Use custom disclaimers and advanced branding](/enterprise-custom-disclaimers-and-branding/)
* [Get your users set up with CrankWheel](/enterprise-user-provisioning/)
