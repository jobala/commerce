---
layout: plain
title: "CrankWheel - Okta SSO for Enterprise"
description: "A guide on how to use Okta SSO for enterprise customers to log their employees directly into CrankWheel."
thumbnail: "/static/images/pages/terms-of-service/logo.png"
sidebar: true
---

# Enterprise SSO Integration - Setup Guide

This guide is for enterprise IT departments, and describes the process of getting single sign-on (SSO) into CrankWheel set up using Okta.

## Prerequisites and limitations

You will need:
   1. An enterprise subscription for CrankWheel.
	 1. An Okta account/setup.

Note that each CrankWheel account needs to use either SSO _or_ CrankWheel's built-in authentication mechanism, never a mix of both. However, if you need different teams to authenticate in different ways, this can be supported by setting up multiple accounts for your organization with different log-on mechanisms for each.

## Overview of the process

Please email [support@crankwheel.com](mailto:support@crankwheel.com) or your technical contact at CrankWheel if you already have one, requesting to set up Okta SSO for your organization.

Your technical contact will get in touch to fully understand your requirements, and will then furnish you with the following details:
   * `AccountID` which you need to provide to activate the `CrankWheel` application in Okta.

If you require use of CrankWheel by different teams accessing different brands owned by your organization, or even of individual agents that switch between different brands, your technical contact will be able to set that up with you, as different sub-accounts of your main account. For simplification, the rest of this document assumes that you have only one sub-account for all SSO users.

Your technical contact at CrankWheel will ask for a list of users to provision in your CrankWheel account, or an email "wildcard" such that any user with an email ending in a particular email domain (such as your corporate domain) can log in to CrankWheel via Okta.

You can expect setup of Okta SSO to take less than a week in most cases.
