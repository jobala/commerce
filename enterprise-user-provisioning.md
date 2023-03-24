---
layout: plain
title: "CrankWheel - Enterprise User Provisioning Guide"
description: "A guide on how to get your users provisioned, and how to install the CrankWheel extension if desired."
thumbnail: "/static/images/pages/terms-of-service/logo.png"
sidebar: true
---

# Enterprise User Provisioning Guide

This guide is for enterprise IT departments, with details on different options for how to do initial provisioning of a large list of users, and different options for whether to and how to install the CrankWheel browser extension.

## Prerequisites

You will need:
   1. An enterprise subscription for CrankWheel.
   1. A list of users to provision, along with their names, headlines and optionally photos.

## Ways to onboard your employees

### Option 1: Have them sign up for themselves

The simplest way to use this option is as follows:

1. Email [support@crankwheel.com](mailto:support@crankwheel.com) with a list of the email domains your corporate users use. Our team will set these up such that users signing up with emails ending in these domains are automatically added to your account.

1. Send users an email asking them to sign up by visiting https://meeting.is/ss/signup and providing their corporate email. They will be guided through the steps from there, and they will automatically be added to your account.

### Option 2: Add them, one-by-one

Any administrator on your account can visit the [access control page](https://meeting.is/ss/user_access) and add users one by one. They will be sent an email with instructions on how to proceed.

### Option 3: Send a list of users to CrankWheel

If you have a long list of users you would like to add initially, you may [copy this Excel template](https://drive.google.com/file/d/1YUgMJjrC5SaMJK3EBAHHAJzagpxq4k7A/view?usp=sharing) and fill it in with the users' details, and email it to [support@crankwheel.com](mailto:support@crankwheel.com).

This approach can be used in a way where each user is sent an email with instructions on how to proceed. It can also be used in a way where they do not get such an email until the first time they try to log in.

### Option 4: Manage user access programmatically via API

CrankWheel's RESTful API allows, among other things, [user management as documented here](https://documenter.getpostman.com/view/1953706/crankwheel-restful-api/713cbLC#774e53ed-58f0-4ff2-8aff-8e2eba1bf5de), so if you wish, you can keep the user list in CrankWheel up-to-date with e.g. a list of users belonging to a certain internal group.

### Option 5: Implicitly create users when they are logged in via SSO

CrankWheel provides the ability to do single sign-on (SSO) and users can be created during the SSO process if they were not previously created. [See details here](/enterprise-sso-integration/).

This option, or option 4 above, should be used when log-ins to CrankWheel are done via SSO rather than through CrankWheel's built-in authentication mechanism.

## CrankWheel's browser extension

CrankWheel works as a pure web application, but is augmented by a browser extension that is available for Google Chrome, Microsoft Edge, and other Chromium-based browsers.

For an enterprise, apart from ergonomic improvements in the usability of CrankWheel for agents, the main benefit of using the browser extension is that it enables features around disallowing certain types of sharing, for example, allowing only to share individual browser tabs, rather than allowing to share the full screen or application windows.

Enterprises may opt to allow use of CrankWheel both as a web app or in conjunction with the browser extension, or they may opt to allow only use of one version or the other (pure web application only, or require installation of the extension). The latter is recommended if you wish to disallow certain sharing modes. Please email [support@crankwheel.com](mailto:support@crankwheel.com) with your request to allow only the browser extension version, if that is your wish.

### Manual installation of browser extension

The simplest approach to the browser extension is to require staff to install the extension themselves. They are prompted to do so during signup as well as at the CrankWheel dashboard after log-in.

If you allow use of CrankWheel only with the browser extension installed (see above), your employees will be shown a non-dismissable prompt to complete installation if they try to use CrankWheel but do not already have the extension installed. Installation is a simple three-click process that takes only a few seconds and does not require administrative privileges.

### Installing browser extension for Google Chrome via Group Policy

Deployment of Google Chrome itself is a problem that Google themselves
have tackled. Please see Google’s guide to [deploying](https://support.google.com/chrome/a/answer/3115278?hl=en) and [managing](https://support.google.com/chrome/a/answer/3115278?hl=en) Google Chrome. In a
nutshell, Google Chrome can be managed via Microsoft’s Active Directory and comes with
.adm files for this purpose. Another way to manage Google Chrome within certain organizations
is to do so via Google’s [Admin Console](https://support.google.com/chrome/a/answer/2657289).

Google also provides ways to manage Chrome Extensions. All Chrome Extensions, including
CrankWheel’s Chrome Extension, can be force installed via Group Policy. An organization might
wish to ban all extensions other than the CrankWheel extension, and this can be accomplished
using the controls over Google Chrome that are available in either Active Directory or the
Google Admin Console as discussed above.

The registry key you would need to set via Group Policy, and its value, looks like this:

```
Software\Policies\Chromium\ExtensionInstallForcelist\1 =
"dooinopjfnhlmmdkdepajfipfhlcmjgp;https://clients2.google.com/service/update2/crx"
```

Note that instead of the `\1` at the end of the key path, you might need to use another
number. This is the case if you already have items underneath the `ExtensionInstallForceList`,
i.e. if you have items ending in `\1`, `\2` and `\3` then you would use `\4` for the new value.

### Installing browser extension for Microsoft Edge via Group Policy

CrankWheel's browser extension can similarly be installed via Group Policy for the Microsoft Edge browser.

Microsoft maintains [documentation on Group Policy settings for Edge here](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies).

The registry key you would need to set, and its value, looks like this:

```
SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallForcelist\1 = "bjpnbepckcncaideamdakikaaofkjmab;https://edge.microsoft.com/extensionwebstorebase/v1/crx"
```

Please note the same caveat as for the Google Chrome related key in the section above.
