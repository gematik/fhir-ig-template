# ISiK-specific tab on the artifact page
To display the ISiK tab on an artifact page, create `ms_comments.json` in `temp/_data`. The easiest way is to add `ms-comments-data.html` to the `includes` folder with this SQL Liquid snippet:

```
{% sqlToData ms_comments with targets as (
    select Url, Json
    from Resources
    where Type = 'StructureDefinition'
  )
  select
    targets.Url as ProfileUrl,
    json_extract(elem.value, '$.id') as Element,
    json_extract(elem.value, '$.short') as Short,
    json_extract(elem.value, '$.comment') as Comment
  from targets,
       json_each(targets.Json, '$.differential.element') as elem
  where coalesce(json_extract(elem.value, '$.mustSupport'), 0) = 1
  order by ProfileUrl, Element
%}
```

Then add a page in `pagecontent`, for example `_generate-ms-data.md`:

```
---
title: generate-ms-data
layout: none
---

{% include ms-comments-data.html %}
```

When you run the IG Publisher, it writes the JSON file, and the template uses that data to render the ISiK tab.
