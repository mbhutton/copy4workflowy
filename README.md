# Copy for WorkFlowy

A Firefox/Chrome user script for copying the page title and URL as a WorkFlowy note
in OPML form, for pasting into WorkFlowy.
 
## Target platforms

- Firefox and Chrome (macOS/Linux/Windows), via [Tampermonkey](https://tampermonkey.net/index.php)

## Getting started

### Install the user script

- Install [Tampermonkey](https://tampermonkey.net/index.php) in Firefox or Chrome.
- In your browser, open the [Copy for WorkFlowy user script](https://github.com/mbhutton/copy4workflowy/raw/master/copy4workflowy.user.js).
- Install the user script in Tampermonkey.

## Using the script

Press the keyboard shortcut (currently hard coded as ctrl-shift-7) on a web page,
then paste the clipboard contents into WorkFlowy.

A notification is shown when the page title and URL are copied to the clipboard.

Special handling is given for WorkFlowy pages:
- URLs on WorkFlowy dev and beta domains are replaced with the workflowy.com domain.
- Page titles for WorkFlowy items are edited to emphasise that they are links.

## Limitations

- The keyboard shortcut is hard coded and cannot be changed without modifying the script.
- It won't work on any web sites which aren't scriptable by Tampermonkey.

## Developing

### Linting

- Some static type checking is performed through the use of `VS Code`, by using `JSDoc` function annotations and a `TypeScript` declaration file.
- Linting is done by by `ESLint`.
- `prettier` is used for formatting.

### Contributing

Pull requests and bug reports are very welcome.

## Alternatives

- [Clip To WorkFlowy](https://chrome.google.com/webstore/detail/clip-to-workflowy/cfifjihfoegnccifkcdomdookdckhaah) Chrome extension

## Authors

- **Matt Hutton** 

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.

