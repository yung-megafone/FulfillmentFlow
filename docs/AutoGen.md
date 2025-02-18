# AutoGen

AutoGen is a userscript designed to enhance ticketing workflows by providing **auto-generated title suggestions**, structured formatting, and improved efficiency in Amazon-related operations.

## Features
- **Dropdown-Based Title Generation**: Select locations and issue types for structured ticket titles.
- **BEDN & CA Number Support**: Allows manual entry of BEDN numbers and optional CA numbers.
- **Custom Formatting**: Automatically structures titles with `@ BEDN:` and `CA` when applicable.
- **TT for Tracking**: Checkbox to append "(TT for Tracking)" for resolved issues.
- **TAB Key Autofill**: Speeds up selection by allowing users to press TAB to complete entries.

## Installation
1. Install a userscript manager such as [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
2. Download the latest version of **AutoGen** from the repository.
3. Add the script to your userscript manager.
4. Open your ticketing interface, and AutoGen will automatically generate title suggestions below the title input.

## Usage
1. **Select a Location** from the dropdown.
2. **Select an Issue Type** from the dropdown.
3. **Enter a BEDN Number** (6-digit, manually inputted).
4. (Optional) **Enter a CA Number** (if applicable).
5. (Optional) **Check "TT for Tracking"** if the issue is resolved.
6. The generated title will be formatted as:
   ```
   Location - Issue XYZ @ BEDN: 123456 CA789 - (TT for Tracking)
   ```
7. **Click "Copy Title to Description"** to insert the generated title into the description field.

## Planned Updates
- **Integration with ClipIt** for a unified script.
- **Smart Issue Detection** to suggest title formats dynamically.
- **Enhanced Autofill** with machine-learning-based predictions.

## License
This project is licensed under the [MIT License](LICENSE). While the code is free to use and modify, it is specifically designed for use within Amazon systems.

## Contributing
Contributions are welcome! If you have improvements or new ideas, feel free to open a pull request or submit an issue.

## Status
⚠ **This version has not been fully tested and requires extensive debugging before it should be considered for deployment.**

## Disclaimer
This script is for personal use and is not officially affiliated with or endorsed by Amazon.