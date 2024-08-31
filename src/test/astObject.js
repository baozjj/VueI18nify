const ast = [
  {
    type: 1,
    tag: "template",
    ns: 0,
    tagType: 0,
    props: [],
    children: [
      {
        type: 1,
        tag: "img",
        ns: 0,
        tagType: 0,
        props: [],
        children: [],
        loc: {
          start: {
            column: 3,
            line: 2,
            offset: 13,
          },
          end: {
            column: 8,
            line: 2,
            offset: 18,
          },
          source: "<img>",
        },
        codegenNode: undefined,
      }, {
        type: 1,
        tag: "img",
        ns: 0,
        tagType: 0,
        props: [],
        children: [],
        loc: {
          start: {
            column: 3,
            line: 3,
            offset: 21,
          },
          end: {
            column: 8,
            line: 3,
            offset: 26,
          },
          source: "<img>",
        },
        codegenNode: undefined,
      }
    ],
    loc: {
      start: {
        column: 1,
        line: 1,
        offset: 0,
      },
      end: {
        column: 12,
        line: 4,
        offset: 44,
      },
      source: "<template>\n  <img>\n  <img></img>\n</template>",
    },
    codegenNode: undefined,
  }
]