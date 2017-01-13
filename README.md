# file-metadata-manager

A simple web-based file and file metadata management admin system. 

## Overview

This standalone admin web app can be used to manage (add/remove/update) file system stored assets, while at the same time manage any associated (custom) metadata. Custom metadata fields are defined via config files. When adding/updating files, metadata can be added/updated as well. All metadata is database stored, so it can be easily retrieved by any third party system that needs to work with this metadata. This system just provides a way to manage files and their associated metadata; it doesn't provide any additional functionality for using the stored files and metadata.

## Technical

- Meteor based web app built using React for the view layer.
- Works with Mongo DB to store file metadata.
- Works with any custom file system location to store uploaded files.

## Installation

Make sure you have [Meteor](https://www.meteor.com/install) installed, then:

```
git clone https://github.com/hwillson/file-metadata-manager.git
cd file-metadata-manager
meteor npm install
meteor
```

The running application can then be accessed at: [http://localhost:3000/files]()

## Testing

Unit tests can be run with `meteor npm test`, then by visiting [http://localhost:3100]().

## Settings

Application settings (stored in `config/settings.json`) are explained below:

```json
{
  "public": {
    TODO
  },
  "private": {
    TODO
  }
}  
```