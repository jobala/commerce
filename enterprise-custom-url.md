---
layout: plain
title: "CrankWheel - Enterprise Custom URL Setup"
description: "A guide on how to set up the necessary page on your servers to use a custom URL base with CrankWheel."
thumbnail: "/static/images/pages/terms-of-service/logo.png"
sidebar: true
---

# Enterprise Custom URL Setup Guide

This guide is for enterprise IT departments, descibing how to set up a CrankWheel template page to enable a custom URL base for use with CrankWheel.

Note that for customers using the WordPress content management system, we have a [separate guide specifically for that scenario](/enterprise-custom-url-wordpress/).

## Prerequisites

You will need:

1. An enterprise subscription for CrankWheel.

1. A web server with an SSL certificate (https).

1. Optionally, a custom domain to use for your custom URL, which could be a sub-domain of your main domain.

## Starting the process

### Step 1: Decide on the custom URL base for use with CrankWheel

First, determine the URL you want to use. A key issue is that it should be easy and unambiguous. You want for your agents to be able to tell your prospects and customers, over the phone, to type this URL in, so design the URL to be as simple and foolproof as possible.

There are three main choices that we recommend:
   
1. A path under your main web domain. For example, if your main domain were `acmecorp.com`, you could use `acmecorp.com/meeting` (meaning the base URL for all of your links would be `https://acmecorp.com/meeting` and your agents could tell users to type in `acmecorp.com/meeting` to get connected).

1. The root path of a subdomain of your main domain. Following the above example, this could be `meeting.acmecorp.com` meaning the base URL for your links would be `https://meeting.acmecorp.com`

1. A separate top-level domain. Following the same example, this could be `acmemeeting.com`

Once you have decided on your URL, install the template file (see below) so that your web server serves it up at the desired URL, using SSL (https).

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

### Step 3: Request tests and configuration

Email your technical contact or [support@crankwheel.com](mailto:support@crankwheel.com), informing them of the URL you have chosen, and that the template file is ready at that URL for testing and configuration on the CrankWheel side.

Tests should take a day or less and your contact will let you know if anything needs to be modified.

After this, your custom URL will be active.
