---
layout: plain
title: "CrankWheel - Enterprise SSO Integration"
description: "A guide on how to use SSO for enterprise customers to log their employees directly into CrankWheel."
thumbnail: "/static/images/pages/terms-of-service/logo.png"
sidebar: true
---

# Enterprise SSO Integration - Setup Guide

This guide is for enterprise IT departments, and describes the process of getting single sign-on (SSO) set up so that your employees can log in to CrankWheel from your company portal.

Note that if you are using Okta, we have a pre-built integration for you; check the [guide for Okta SSO](/enterprise-sso-okta-guide/).

## Prerequisites and limitations

You will need:
   1. An enterprise subscription for CrankWheel.
   2. An identity "source of truth" within your organization's intranet or extranet, that can be used to issue a server-to-server request to CrankWheel's APIs, and then redirect your employee to a URL returned by that request.

Note that each CrankWheel account needs to use either SSO _or_ CrankWheel's built-in authentication mechanism, never a mix of both. However, if you need different teams to authenticate in different ways, this can be supported by setting up multiple accounts for your organization with different log-on mechanisms for each.

## Starting the process

Please email [support@crankwheel.com](mailto:support@crankwheel.com) or your technical contact at CrankWheel if you already have one, requesting to set up SSO for your organization.

Your technical contact will get in touch to fully understand your requirements, and will then furnish you with the following details:
   * `API_KEY`: An API key that may be used for your so-called "reseller" account. This is a master account for one or more accounts assigned to your organization with which you can use our [Reseller API](https://documenter.getpostman.com/view/1953706/S11Lscu6), which our SSO mechanism is part of, and (via an impersonation approach documented in the Reseller API docs) also our so-called [RESTful API](https://documenter.getpostman.com/view/1953706/crankwheel-restful-api/713cbLC) which may be used for advanced user provisioning and other needs; and
	 * `CLIENT_ID`: The ID of a sub-account of your reseller account, on which SSO has been enabled.

If you require use of CrankWheel by different teams accessing different brands owned by your organization, or even of individual agents that switch between different brands, your technical contact will be able to set that up with you, as different sub-accounts of your reseller account. For simplification, the rest of this document assumes that you have only one sub-account for all SSO users.

## Typical SSO API usage

The typical way to use the SSO API would be for your "source of truth" that knows the current corporate user's identity (in the below example, `jane.doe@acmecorp.com`) to issue an API request to [CrankWheel's SSO API](https://documenter.getpostman.com/view/1953706/S11Lscu6#349ee428-dfaf-4085-a9d5-b7f1bcb59e58) such as the following (illustrated here by showing equivalent parameters for the `curl` command-line utility):

```
curl --location --request POST 'https://meeting.is/ss/rsapi/grant_token/jane.doe@acmecorp.com?client_id=CLIENT_ID' \
--header 'Authorization: Basic API_KEY' \
--data-raw ''
```

(with `CLIENT_ID` and `API_KEY` replaced by the information provided by your technical contact).

This API call will, if successful, respond with a JSON-encoded body similar to this:

```
{
    "login_url": "https://meeting.is/ss/auth/rlogin/jane.doe@acmecorp.com:82E2B7B7F52CCAB349BA588D95B263FA00BE80867A9D656D053167674D6F03C2"
}
```

The `login_url` parameter of the body is a URL that is valid for 2 minutes and to which the user in question should be navigated in order to log in to CrankWheel. This will send the user to CrankWheel's self-service dashboard https://meeting.is/ss from where they may initiate screen sharing.

In the above example, the `client_id` parameter is set on the API URL. This implicitly creates an account for the user in question if their account does not already exist. There are alternatives to this if you would prefer to fully manage the list of users allowed to access CrankWheel within your organization. Feel free to ask your technical contact for the details.

All API documentation for CrankWheel is accessible from [this page](/api/).

## SSO API usage to directly show CrankWheel control panel

One common variation on the above is to directly show the CrankWheel control panel (used for screen sharing) rather than the dashboard. For this, the API request would change to:

```
curl --location --request POST 'https://meeting.is/ss/rsapi/grant_token/jane.doe@acmecorp.com?client_id=CLIENT_ID&dest_url=/ss/app/home' \
--header 'Authorization: Basic API_KEY' \
--data-raw ''
```

and once you retrieve the `login_url` from the response, you would append `?mode=popup_only` to the URL before navigating the user to it.
