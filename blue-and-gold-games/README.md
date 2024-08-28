## How to Get Data

This is how I did it as an example, you can use any method as long as it works.

- Find the raw data
  - There is a google sheet with the data
  - You can select and paste data as a tsv (like csv, tab seperated values) in google sheets
  - Unfortunately, data is formatted to look good, not for a parser
- Raw data -> parsable file
  - Easiest way to get data from the sheet was to copy little chunks that are formatted uniformly and paste them into a custom format
  - Chunking
    - In this case, the data is seperated into chunks via blocks (the time that the event starts at), and for a block chunk there is further seperation into genre chunks
    - Each chunk starts with a label for the chunk (so it is like a Map) and the remaining lines are the value of the chunk
    - There is a named seperator to split into two chunks of the same kind
    - The value of a genre chunk is just a tsv
  - Replace tabs with semicolons
    - Choose a symbol that isn't already being used in the values
  - Then manually go through and modify the data just to make sure it is all uniform and will display nicely
  - The goal of the parsable file is to balance making it easy to generate and easy to parse
- Once you have data in a parsable form, you can create a python script to convert it into json, but that adds unnecessary complexity
