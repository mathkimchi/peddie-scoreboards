


rawData.tsv and events.json are unused.

## How to Get Data

This is how I did it as an example, you can use any method as long as it works.

- Find the raw data
  - There is a google sheet with the data
  - You can select and paste data as a tsv (like csv, tab seperated values) in google sheets
  - Unfortunately, data is formatted to look good, not for a parser
- Raw data -> parsable file
  - Easiest way to get data from the sheet was to copy little chunks that are formatted uniformly and paste them into a custom format
  - Attribute Setting
    - Every line is either a datapoint or an attribute.
    - This data is in the form `Event Name;Event Location;Points Worth`, but that is arbitrary
    - An attribute line is in the form `$ATTRNAME:Attribute Value`
    - Once an attribute is set, all data below it will have that attribute value, until it is set to something else
  - Replace tabs with semicolons
    - Choose a symbol that isn't already being used in the values
  - Then manually go through and modify the data just to make sure it is all uniform and will display nicely
  - The goal of the parsable file is to balance making it easy to generate and easy to parse
- Once you have data in a parsable form, you can create a python script to convert it into json, but that adds unnecessary complexity

## How to Update Data

Things to update during the games:
- totalScores.json
- activeBlockIndex inside of update-scores.js
  - TODO: automate this?
