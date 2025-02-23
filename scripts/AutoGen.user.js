// ==UserScript==
// @name        AutoGen
// @namespace   Yung-Megafone
// @version     1.2-alpha.1
// @description Generates dropdown suggestions for ticket titles and provides a [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance) input field with optional tracking status and TAB autocomplete
// @author      Brando <capto.brando@pm.me>
// @include     http*://[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)*
// @run-at      document-end
// @grant       none
// @updateURL   https://raw.githubusercontent.com/yung-megafone/FulfillmentFlow/refs/heads/main/scripts/AutoGen.user.js
// @downloadURL https://raw.githubusercontent.com/yung-megafone/FulfillmentFlow/refs/heads/main/scripts/AutoGen.user.js
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Runs every 3 seconds to check if the suggestion panel exists and prevents duplication.
     */
    setInterval(function() {
        if (document.getElementById('auto_suggestion_panel')) {
            return; // Exit if panel is already present
        }

        var titleInput = document.getElementById('[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)');
        if (titleInput) {
            console.log('Adding auto-suggestion panel');

            // Create suggestion panel container
            var suggestionPanel = document.createElement('div');
            suggestionPanel.setAttribute('id', 'auto_suggestion_panel');
            suggestionPanel.setAttribute('style', 'margin-top: 10px; background: #f4f4f4; padding: 10px; border-radius: 5px; border: 1px solid #ccc;');

            // Add dropdowns and input fields
            suggestionPanel.appendChild(createDropdown('Location', ['[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)', '[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)', '[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)']));
            suggestionPanel.appendChild(createDropdown('Issue', ['[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)', '[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)', '[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)', '[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)', '[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)', '[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)']));
            suggestionPanel.appendChild(create[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input());
            suggestionPanel.appendChild(create[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input());
            suggestionPanel.appendChild(createTrackingCheckbox());

            // Add "Copy Title to Description" button
            var copyButton = document.createElement('button');
            copyButton.innerText = 'Copy Title to Description';
            copyButton.setAttribute('id', 'copy_title_to_desc_btn');
            copyButton.setAttribute('style', 'display: block; margin-top: 10px; padding: 5px 10px; background: #0073e6; color: #fff; border: none; border-radius: 3px; cursor: pointer;');
            copyButton.addEventListener('click', copyTitleToDescription);

            suggestionPanel.appendChild(copyButton);

            // Insert panel below the title input
            titleInput.parentNode.insertBefore(suggestionPanel, titleInput.nextSibling);
        }
    }, 3000);

    /**
     * Creates a dropdown for selecting Location or Issue Type with TAB autocomplete.
     */
    function createDropdown(label, options) {
        var container = document.createElement('div');
        container.setAttribute('style', 'margin-bottom: 5px;');

        var select = document.createElement('select');
        select.setAttribute('style', 'width: 100%; padding: 5px; border-radius: 3px; border: 1px solid #ccc;');

        // Default option
        var defaultOption = document.createElement('option');
        defaultOption.innerText = `Select ${label}`;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        // Populate dropdown options
        options.forEach(optionText => {
            var option = document.createElement('option');
            option.innerText = optionText;
            select.appendChild(option);
        });

        // Update title when an option is selected
        select.addEventListener('change', function() {
            updateTitle();
        });

        // Enable TAB key selection
        select.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                select.blur(); // Close dropdown
                updateTitle(); // Apply selection
            }
        });

        container.appendChild(select);
        return container;
    }

    /**
     * Creates an input field for the [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance) number.
     */
    function create[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input() {
        var container = document.createElement('div');
        container.setAttribute('style', 'margin-bottom: 5px;');

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', '6');
        input.setAttribute('placeholder', 'Enter [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)');
        input.setAttribute('style', 'width: 100%; padding: 5px; border-radius: 3px; border: 1px solid #ccc; text-align: center;');

        // Restrict input to numbers only
        input.addEventListener('input', function() {
            input.value = input.value.replace(/\D/g, '').slice(0, 6);
            updateTitle();
        });

        container.appendChild(input);
        return container;
    }

    /**
     * [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)
     */
    function create[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input() {
        var container = document.createElement('div');
        container.setAttribute('style', 'margin-bottom: 5px;');

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', '6');
        input.setAttribute('placeholder', 'Enter [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance) Number [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)');
        input.setAttribute('style', 'width: 100%; padding: 5px; border-radius: 3px; border: 1px solid #ccc; text-align: center;');

        // Format input properly
        input.addEventListener('input', function() {
            input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
            updateTitle();
        });

        container.appendChild(input);
        return container;
    }

    /**
     * Creates a checkbox for optional "(TT for Tracking)" tag.
     */
    function createTrackingCheckbox() {
        var container = document.createElement('div');
        container.setAttribute('style', 'margin-bottom: 5px;');

        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'tracking_checkbox');

        var label = document.createElement('label');
        label.setAttribute('for', 'tracking_checkbox');
        label.innerText = " Mark as (TT for Tracking)";
        label.setAttribute('style', 'margin-left: 5px; font-size: 14px;');

        checkbox.addEventListener('change', function() {
            updateTitle();
        });

        container.appendChild(checkbox);
        container.appendChild(label);
        return container;
    }

    /**
     * Updates the title input based on dropdown selections, [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance), [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance), and tracking checkbox.
     */
    function updateTitle() {
        var titleInput = document.getElementById('[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)');
        if (!titleInput) return;

        var dropdowns = document.querySelectorAll('#auto_suggestion_panel select');
        var [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input = document.querySelector('#auto_suggestion_panel input[placeholder*="[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)"]');
        var [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input = document.querySelector('#auto_suggestion_panel input[placeholder*=[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)]');
        var trackingCheckbox = document.getElementById('tracking_checkbox');

        var selectedLocation = dropdowns[0].value !== 'Select Location' ? dropdowns[0].value : '';
        var selectedIssue = dropdowns[1].value !== 'Select Issue' ? dropdowns[1].value : '';
        var [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Value = [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input.value.length === 6 ? `@ [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance): ${[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input.value}` : '';
        var [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Value = [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input.value ? `[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)${[REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Input.value}` : '';
        var trackingTag = trackingCheckbox.checked ? "(TT for Tracking)" : '';

        titleInput.value = [selectedLocation, selectedIssue, [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Value, [REDACTED – Reference: Confidential Information Policy §3.1](../README.md#confidentiality--compliance)Value, trackingTag].filter(Boolean).join(' - ');
    }

})();
