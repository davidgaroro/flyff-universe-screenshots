# Flyff Universe - Screenshots

Unofficial browser extension to take screenshots in Flyff Universe and save them automatically.

This extension tries to simulate the screenshot functionality of the old Flyff client.

## Installation

You can use the extension on the following browsers:

- [Chrome](https://chromewebstore.google.com/detail/khpalflfiahnldcpemicflhkmkbpmkcb) (recommended)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/jgpgjbddklniojogkhamhocjlnpmdmof) (recommended)
- Opera (awaiting publication, but you can install the [Chrome extension](https://chromewebstore.google.com/detail/khpalflfiahnldcpemicflhkmkbpmkcb) from Opera)
- [Firefox](https://addons.mozilla.org/firefox/addon/flyff-universe-screenshots)

## How it Works

1. Open [universe.flyff.com/play](https://universe.flyff.com/play).
2. There are two ways to take screenshots:
   - **Click** on the **extension icon** in the browser toolbar.
   - Use the keyboard shortcut **Ctrl+Shift+F** (or your custom shortcut).
3. The screenshots will be automatically saved in the folder:
   - `<Downloads folder>\Flyff Universe - Screenshots`.

> [!WARNING]
> The shortcut in Firefox does not work properly. It only activates when the cursor is focused on a text input in-game.
> This appears to be an issue with Firefox itself, not with the extension.

## Options

| Name                      | Description                                                          | Default        |
| ------------------------- | -------------------------------------------------------------------- | -------------- |
| Format                    | JPG or PNG                                                           | JPG            |
| Quality                   | Image quality level (0 = lowest, 100 = highest; applies only to JPG) | 75%            |
| Shortcut                  | Keyboard shortcut to take screenshots (customizable)                 | `Ctrl+Shift+F` |
| Show in downloads history | Keep screenshots in the browser's downloads history                  | Disabled       |

> [!WARNING]
> If you change the shortcut to a key combination already used by the browser or the game, it may cause conflicts.

> [!NOTE]
> To change the shortcut in Firefox, you need to do it through the browser settings.  
> For more information, visit [this page](https://support.mozilla.org/kb/manage-extension-shortcuts-firefox).

## Source Code

You can also install the extension from the source code:

1. Download the extension's source code.
2. Load the unpacked extension in developer mode:
   - [Chrome Documentation](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)
   - [Edge Documentation](https://learn.microsoft.com/microsoft-edge/extensions-chromium/getting-started/extension-sideloading)
   - [Opera Documentation](https://help.opera.com/extensions/testing/#developer-mode)
   - [Firefox Documentation](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

> [!NOTE]
> To use it in Firefox, rename the file `manifest.firefox.json` to `manifest.json` to ensure that the extension functions correctly with `background.firefox.js`. This is necessary because in Firefox, `chrome.downloads.download` does not allow a base64 image URL, so a blob is used to make it work. Additionally, `chrome.downloads.setUiOptions` does not exist in Firefox.

## Disclaimer

This project is not endorsed by Gala Lab Corp.

## Donation

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/donate?hosted_button_id=T7CVYXY994KHJ)

## License

[MIT](LICENSE)
