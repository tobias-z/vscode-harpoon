## [1.4.0]

- Added new command `gotoPreviousHarpoonEditor` allowing the ability to jump to the previous harpoon editor.

## [1.3.2]

- Fixed bug in Windows where the user would not see the filename in the quick pick menu

## [1.3.1]

- Added the ability to remove an editor from the quick pick menu
- Fixed bug where AddEditor would append after the latest editor, even if there was an index available before it (e.g. if an editor was added using AddEditor5)

## [1.3.0]

- Added ability to use vscode-harpoon inside a 'Live Share' (https://learn.microsoft.com/en-us/visualstudio/liveshare/) session.

## [1.2.2]

- Allow files living on the windows D drive to be marked as editors.

## [1.2.1]

- Allow jumping to already open splits

## [1.2.0]

- Allow the ability to be specific about which id you want your editor to be at. such as addEditor5

## [1.1.1]

- Fixed bug where editors would be added multiple times
- Changed location of vscodeHarpoon.harpoon file to ~/.vscode/vscodeHarpoon.harpoon so that it wont
  be accidentally committed to git

## [1.1.0] - 2022-04-07

- Add the ability to use a quick pick menu for navigation

## [0.0.1 - 1.0.0] - 2022-03-27

- Initial release

### Added

- User can add editors both globally and per workspace
- User can change editors (1 - 9) both globally and per workspace
- User can edit editors both globally and per workspace
