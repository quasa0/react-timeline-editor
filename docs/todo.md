---
title: TODO
---

### Feature Extensions

- [ ] Zoom timeline (can be implemented by controlling scale, need to provide external wheel callback?)
- [x] Pass time as parameter when clicking
- [x] Migrate style rendering: from effects => props, provide more powerful style extension capabilities
- [x] Allow custom time area rendering capabilities


### Design Extensions
- [ ] Consider how to be compatible with the following common frame animation editor interaction modes, and whether it is necessary to be compatible (below are preliminary considered compatibility implementation solutions)
  - [ ] Action data structure changes
    - [ ] Solution 1: Convert previous start, end to points collection
    - [ ] Solution 2: Add group concept to group actions
  - [ ] Engine multi-time unit adaptation capability (s/frames)
![aim](/assets/aim.png)