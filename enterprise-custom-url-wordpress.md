---
layout: plain
title: "CrankWheel - Enterprise Custom URL Setup for WordPress"
description: "A guide on how to set up the necessary page on a WordPress site to use a custom URL base with CrankWheel."
thumbnail: "/static/images/pages/terms-of-service/logo.png"
sidebar: true
---

# Enterprise Custom URL Setup Guide for WordPress

This guide is for enterprise IT departments, descibing how to set up a CrankWheel template page to enable a custom URL base for use with CrankWheel, when your site is hosted using WordPress.

Note that for customers not using WordPress, we have a [separate guide](/enterprise-custom-url/).

## Prerequisites

You will need:

1. An enterprise subscription for CrankWheel.

1. A web server with an SSL certificate (https).

1. Optionally, a custom domain to use for your custom URL, which could be a sub-domain of your main domain.

1. Administrative access to your WordPress site, including the ability to install a WordPress plug-in.

## Follow the process

### Step 1: Decide on the custom URL base for use with CrankWheel

First, determine the URL you want to use. A key issue is that it should be easy and unambiguous, and it must not conflict with any other content on your WordPress site.

You want for your agents to be able to tell your prospects and customers, over the phone, to type this URL in, so design the URL to be as simple and foolproof as possible.

In the below, we will assume that your main domain name is `acmecorp.com` and you chose the URL `acmecorp.com/demo` as the base for your CrankWheel links.

Please note again that it is important that no other content on your site have the URL `/demo`.

### Step 2: Generate your template file

The file you need to cause your web server(s) to serve, at your chosen URL, using SSL (https) should have the following contents, except you need to replace the two occurrences of `acmecorp` with your account ID (ask your CrankWheel technical contact, or [support@crankwheel.com](mailto:support@crankwheel.com) if you are unsure of your account ID), and replace "Acme Corp Meetings" with whatever title you would like your viewer's browser address bar to show when they visit the page:

```
<html>

<head>
  <style>
    body {
      margin: 0;
    }

    .public-link-iframe {
      display: block;
      border: none;
      width: 100%;
      height: 100%;
    }
  </style>
  <title> Acme Corp Meetings </title>
</head>

<body>
  <iframe id="crankwheel-frame" class="public-link-iframe" src="https://meeting.is/acmecorp"></iframe>

  <script>
    var crankwheelAccountUrl = 'https://meeting.is/acmecorp';
    if (document.location.search) {
      window.location.href = crankwheelAccountUrl + document.location.search;
    }
  </script>
</body>

</html>
```

Copy the above, open it in a text editor like Notepad on Windows, or TextEdit on macOS, and save it to your hard disk with the name `index.html` (the name is important; save it in a new folder if the `index.html` name conflicts with other files).

### Step 3: Host the above file on your WordPress site

1. Install the "File Manager" plug-in by going to the WordPress admin panel's "Add Plugins" page, searching for "File Manager" and installing the top search result (the author of the plug-in in question is /mndpsingh287/). <img class="responsive-img" src="/static/images/wpstatic/step1.png" alt=""/>

1. You should now see an entry for "WP File Manager" near the bottom of the left-hand navigation bar. Click on that to open it. <img class="responsive-img" src="/static/images/wpstatic/step2.png" alt=""/>

1. The WP File Manager will now open up and show a view similar to the below. Click on 'public_html' in the left-hand nav, then click the add folder button (it is highlighted by the mouse in the screenshot below). Add a folder named `demo` (again, this assumes your chosen URL for CrankWheel is `acmecorp.com/demo`. If it was something different, name the folder for the last part of the URL). <img class="responsive-img" src="/static/images/wpstatic/step3.png" alt=""/>

1. Double-click on the folder you created, to open it. You should see a message that you can drag and drop files into it.

1. Drag-and-drop the `index.html` file you saved in step 2 above, into the newly-created folder.

1. Make sure the filename shows as `index.html` just like the screenshot below: <img class="responsive-img" src="/static/images/wpstatic/step4.png" alt=""/>

1. Open your chosen URL in a browser (e.g. `acmecorp.com/demo`) and make sure it shows something similar to the below: <img class="responsive-img" src="/static/images/wpstatic/step5.png" alt=""/>

### Step 4: Request tests and configuration

Email your technical contact or [support@crankwheel.com](mailto:support@crankwheel.com), informing them of the URL you have chosen, and that the template file is ready at that URL for testing and configuration on the CrankWheel side.

Tests should take a day or less and your contact will let you know if anything needs to be modified.

After this, your custom URL will be active.
