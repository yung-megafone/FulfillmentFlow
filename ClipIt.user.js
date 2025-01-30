// ==UserScript==
// @name         ClipIt
// @namespace    Yung-Megafone
// @version      0.1.1
// @description  Automatically copies the title and URL of a ticket for easy dissemination
// @author       Brando <capto.brando@pm.me>
// @include      http*://t.corp.amazon.com/*
// @run-at       document-end
// @grant        GM_setClipboard
// @updateURL    https://raw.githubusercontent.com/yung-megafone/FulfillmentFlow/refs/heads/main/ClipIt.user.js
// @downloadURL  https://raw.githubusercontent.com/yung-megafone/FulfillmentFlow/refs/heads/main/ClipIt.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Runs every 3 seconds to check if the "Click Me Bruh" button already exists.
    // If it doesn't exist, the script will create and insert it.
    setInterval(function() {
        if (document.getElementById('copyticketbutton')) {
            return; // Exit if the button is already there to avoid duplication
        }

        // Locate the container where buttons are placed
        var interactiveButtons = document.getElementsByClassName('interaction-buttons');
        if (interactiveButtons.length > 0) {
            console.log('Adding t-copy button');

            // Create a new button element
            var button = document.createElement('button');
            button.appendChild(document.createTextNode(' Click Me Bruh'));
            button.setAttribute('class', 'awsui-button awsui-button-variant-normal awsui-hover-child-icons');
            button.setAttribute('id', 'copyticketbutton');
            button.addEventListener('click', processAndCopyTicketInformation, false);

            // Create a wrapper div and insert the button into it
            var div = document.createElement('div');
            div.setAttribute('class', 'edit-issue');
            div.appendChild(button);

            // Insert the new button at the top of the interaction buttons section
            interactiveButtons[0].insertBefore(div, interactiveButtons[0].firstChild);
        }
    }, 3000);

    // Function to copy ticket title and URL to the clipboard
    function processAndCopyTicketInformation() {
        // Locate the ticket title input field
        var titleElement = document.getElementById('ticket-title');
        var title = titleElement ? titleElement.value.trim() : "Untitled Ticket";

        // Construct the text string to copy
        var text = `${title} {${document.URL}}`;

        // Copy the text to the clipboard using Greasemonkey's API
        GM_setClipboard(text, 'text');

        // Show toast notification to confirm the action
        showCopySuccessNotification("Copied to clipboard!");

        // Update button tooltip as an extra indicator
        var button = document.getElementById('copyticketbutton');
        button.setAttribute('title', 'Copied to clipboard!!');
    }

    // Function to display a toast popup message
    function showCopySuccessNotification(message) {
        // Create a div element for the toast
        var toast = document.createElement('div');
        toast.innerText = message;
        
        // Apply styling for the toast notification
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = '#fff';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '10000';
        toast.style.fontSize = '14px';
        toast.style.opacity = '1';
        toast.style.transition = 'opacity 0.5s ease-in-out';

        // Append the toast to the body
        document.body.appendChild(toast);

        // Remove the toast after 2 seconds with a fade-out effect
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 2000);
    }

// Function to sync the ticket title with the description field while allowing user edits
function autoSyncTitleWithDescription() {
    var titleInput = document.getElementById('ticket-title');
    var descriptionArea = document.getElementById('markdown-editor');

    if (titleInput && descriptionArea) {
        titleInput.addEventListener('input', function() {
            var currentDescription = descriptionArea.value;
            var newTitle = `[Ticket Title]: ${titleInput.value}`;

            // Check if the description already starts with the title format
            if (currentDescription.startsWith("[Ticket Title]: ")) {
                // Preserve user edits after the title
                var userContent = currentDescription.substring(currentDescription.indexOf("\n") + 1);
                descriptionArea.value = `${newTitle}\n${userContent}`;
            } else {
                // If the user hasn't modified it, just set the title
                descriptionArea.value = `${newTitle}\n${currentDescription}`;
            }
        });
    }
}

    // Run auto-fill function once the DOM is fully loaded
    window.addEventListener('load', autoSyncDescriptionWithTitle);

})();
