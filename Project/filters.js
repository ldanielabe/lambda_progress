const defaultFilter = [
  // Status is Empty
  {
    property: "Status",
    select: {
      is_empty: true,
    },
  },

  // and item type is not Pack
  {
    property: "Item Type",
    multi_select: {
      does_not_contain: "Pack",
    },
  },

  // and not contain any of the following pages
  {
    or: [
      {
        property: "Parents",
        relation: {
          does_not_contain: "5e4935b9475b4b42b65adfc1ebf70196",
        },
      },
      {
        property: "Parents",
        relation: {
          does_not_contain: "07dc74b42a7a4b948b5a3b35299a6e7d",
        },
      },
      {
        property: "Parents",
        relation: {
          does_not_contain: "3e9bf0f16075402abc321e61a34e71c1",
        },
      },
    ],
  },
];

const _3D = [
  // and Stage is Rendering or Pre-Assembling
  {
    or: [
      {
        property: "Stage",
        select: {
          equals: "Rendering",
        },
      },
      {
        property: "Stage",
        select: {
          equals: "Pre-Assembling",
        },
      },
    ],
  },
];

const content = [
  {
    or: [
      {
        property: "Stage",
        select: {
          equals: "Package Building",
        },
      },
    ],
  },
];

const design = [
  {
    or: [
      {
        property: "Stage",
        select: {
          equals: "Ckeck-in",
        },
      },
      {
        property: "Stage",
        select: {
          equals: "Design",
        },
      },
      {
        property: "Stage",
        select: {
          equals: "QA4",
        },
      },
    ],
  },
];

const assembly = [
  {
    or: [
      {
        property: "Stage",
        select: {
          equals: "Assembly Backlog",
        },
      },
      {
        property: "Stage",
        select: {
          equals: "Assembling",
        },
      },
      {
        property: "Stage",
        select: {
          equals: "QA3",
        },
      },
    ],
  },
];
module.exports = { defaultFilter, _3D, content, design, assembly };
