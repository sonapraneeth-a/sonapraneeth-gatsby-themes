# Tests

- [ ] Stop theme execution in below cases

  - [x] If no data is provided in yaml
    - Throws error: Unable to retrieve data
  - [x] If author option in gatsby-config.js does not match name field in any entry of yml file
    - Throws error: Unable to retrieve data
  - [x] If author option is empty
  - Throws error: Author option is empty

- [x] Create necessary directories if they are absent
- [ ] Check for mdx file query if mdx is not present
