# MultiStep
MultiStep is a multi-step wizard plugin based on bootstrap 4.0

Check out [demo page](https://kinle.github.io/MultiStep/demo.html)

# Getting started
Prerequisities
jQuery - v3.4.x
Boostrap v4.x.x

## Using distribution files
Include the css in `<head>` tag element
`<link rel="stylesheet" type="text/css" href="css/MultiStep.min.css">`

Include jQuery and MultiStep js in `<footer>` or `<body` tag element;
```
<script type="text/javascript" src="js/jquery.min.js"></script>
```
```
<script type="text/javascript" src="js/MultiStep.min.js"></script>
```

**Note: Using minified version will have less load while serving the distribution**
## Using Gulp Browser Sync (Optional)
#### Step 1 - Node.js installation

You need to have Node.js (Node) installed on your computer before you can install Gulp.

Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. To install it, please:

1. Go to https://nodejs.org and download node.js

2. Launch the installation program and install Node with all default settings.

#### Step 2 - Gulp initialization

Go to command promt and enter the command `gulp go` to serve live server
You can customize the scss files in `/src` directory for modifying styles according to your need and the compiled css will be stored in `/dist/css` directory


# Setup MultiStep
## By `multi-step` class name
MultiStep automatically initializes select elements with `multi-step` class.
```
<div class="multi-step"></div>
```

## By MultiStep constructor
```
    $(document).ready(function() {
        $('.multi-step').MultiStep([options]);
    });
```

# Options
## data[]
Array of Steps that is used to create multi-step wizard
The data array is a JSON array with following keys
  1. label - Label for the step
  2. content - HTML content to be included in a step
  3. skip - Boolean if the the step is skippable
  
## final
The content for final step which is a general message for confimation
The default value is `Are you sure you want to confirm?`

## finalLabel
The lable for final content. Default value is `Complete`

## title
The title of the modal. By default there is no title

## modalSize
Size of modal
```
sm - small
md - medium
lg - large
xl - extra large
```
Default value is `md`

## prevText
The text for previous button
Default value is `Previous`

## skipText
The text for skip button
Default value is `Skip`

## nextText
The text for next button
Default value is `Next`

## finishText
The text for finish button
Default value is `Finish`

## $(..).MultiStep('destroy')
Callback for destroying the modal

## onClose($elem)
Triggers when modal is closed. Passes modal root element as paramter

## onDestroy()
Triggers when modal is destroyed. Passes modal root element as paramter

