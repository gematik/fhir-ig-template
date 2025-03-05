---
---
const literatureData = [
    {% for entry in site.data.bibliography.entries %}
    {
        key: "{{ entry.key }}",
        link: "{{ entry.link }}",
        title: "{{ entry.title }}",
        author: "{{ entry.author }}"
    }{% if forloop.last %}{% else %},{% endif %}
    {% endfor %}
];

document.addEventListener("DOMContentLoaded", function () {
    igtools.convertBibliographyToLink(literatureData);
});