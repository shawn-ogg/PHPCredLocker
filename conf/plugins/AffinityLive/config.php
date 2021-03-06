<?php
/** Affinity Live API Integration plugin Config
*
* Copyright (C) 2012 B Tasker
* Released under GNU AGPL V3
* See LICENSE
*
*/
defined('_CREDLOCK') or die;

// Set this to false to disable the plugin
$this->active = false;

// Set this to true to stop the plugin sending data to AL (Debug output will be generated instead
$this->testmode = false;

// URL to post logging data to
$this->url = "https://yourdomain.affinitylive.com/forms/public/issue";

// Issue status
$this->loggingstatus = 4;

// Issue Priority
$this->loggingpriority = 5;

// Issue Type
$this->loggingissuetype = 1;


// Date format - Will be appended to AL Tickets
$this->dateformat = 'd-m-Y H:i';


?>