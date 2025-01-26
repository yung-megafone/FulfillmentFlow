// ==UserScript==
// @name         ClipIt - Ticket URL Copier
// @namespace    Yung-Megafone
// @version      0.1
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

    // Set an interval to check for the ticket action buttons every 3 seconds
    setInterval(function() {
        // Check if both copy buttons already exist to avoid duplicate buttons
        if (document.getElementById('copy_ticket_as_hyperlink_button') && document.getElementById('copy_ticket_as_plain_text_button')) {
            // If both buttons exist, we don't need to add them again
            return;
        }

        // Find the container for interactive action buttons
        var actionButtonsContainer = document.getElementsByClassName('interaction-buttons');
        if (actionButtonsContainer.length > 0) {
            console.log('Adding ticket copy buttons');

            // Create the "Copy as Hyperlink" button
            var copyAsHyperlinkButton = document.createElement('button');
            copyAsHyperlinkButton.appendChild(document.createTextNode('Copy Ticket as Hyperlink'));
            copyAsHyperlinkButton.setAttribute('class', 'awsui-button awsui-button-variant-normal awsui-hover-child-icons');
            copyAsHyperlinkButton.setAttribute('id', 'copy_ticket_as_hyperlink_button');
            copyAsHyperlinkButton.addEventListener('click', copyTicketAsHyperlink, false);

            // Create the "Copy as Plain Text" button
            var copyAsPlainTextButton = document.createElement('button');
            copyAsPlainTextButton.appendChild(document.createTextNode('Copy Ticket as Plain Text'));
            copyAsPlainTextButton.setAttribute('class', 'awsui-button awsui-button-variant-normal awsui-hover-child-icons');
            copyAsPlainTextButton.setAttribute('id', 'copy_ticket_as_plain_text_button');
            copyAsPlainTextButton.addEventListener('click', copyTicketAsPlainText, false);

            // Create a div to wrap both buttons
            var buttonsWrapperDiv = document.createElement('div');
            buttonsWrapperDiv.setAttribute('class', 'edit-issue');
            // Append both buttons to the wrapper div
            buttonsWrapperDiv.appendChild(copyAsHyperlinkButton);
            buttonsWrapperDiv.appendChild(copyAsPlainTextButton);
            // Insert the buttons div into the action buttons container
            actionButtonsContainer[0].insertBefore(buttonsWrapperDiv, actionButtonsContainer[0].firstChild);
        }
    }, 3000); // Check every 3 seconds

    // Function to copy the ticket title and URL as a Slack-friendly hyperlink
    function copyTicketAsHyperlink() {
        var ticketTitle = document.getElementsByClassName('title-container')[0].children[0].innerText;
        var ticketURL = document.URL;
        
        // Format the text in Slack-friendly Markdown: <URL|Title> format
        var formattedText = `<${ticketURL}|${ticketTitle}> (${ticketURL})`;

        // Copy the formatted text to the clipboard
        GM_setClipboard(formattedText, 'text');

        // Show a success notification popup
        showPopup('Ticket copied as hyperlink!');
    }

    // Function to copy the ticket title and URL as plain text
    function copyTicketAsPlainText() {
        var ticketTitle = document.getElementsByClassName('title-container')[0].children[0].innerText;
        var ticketURL = document.URL;

        // Format the text as plain text: "Title (URL)"
        var plainText = ticketTitle + ' (' + ticketURL + ')';

        // Copy the plain text to the clipboard
        GM_setClipboard(plainText, 'text');

        // Show a success notification popup
        showPopup('Ticket copied as plain text!');
    }

    // Function to create and show a popup notification
    function showPopup(message) {
        // Create the popup element
        var popup = document.createElement('div');
        popup.textContent = message; // Set the message text
        popup.style.position = 'fixed';
        popup.style.bottom = '20px'; // Position at the bottom of the screen
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)'; // Center horizontally
        popup.style.backgroundColor = '#28a745'; // Green background (success)
        popup.style.color = 'white';
        popup.style.padding = '10px 20px';
        popup.style.borderRadius = '5px';
        popup.style.fontSize = '14px';
        popup.style.zIndex = '9999'; // Ensure it's above other elements
        popup.style.opacity = '1';
        popup.style.transition = 'opacity 0.5s ease-out'; // Smooth fade-out effect

        // Append the popup to the body
        document.body.appendChild(popup);

        // Set a timeout to hide the popup after 3 seconds
        setTimeout(function() {
            popup.style.opacity = '0'; // Fade out the popup
            // Remove the popup from the DOM after the fade-out transition
            setTimeout(function() {
                popup.remove();
            }, 500);
        }, 3000); // Popup will disappear after 3 seconds
    }
})();
